import { jsPDF } from 'jspdf';
import { Module } from '@/types';
import { BusinessState } from '@/types';

/**
 * Generate an Ivy-branded PDF for a single module. Used from module page and home page.
 * @param cornerImageDataUrl - Optional data URL of the Ivy emblem to place very small in the top corner.
 */
export function exportModulePDF(
  moduleData: Module,
  moduleId: string,
  state: Pick<BusinessState, 'moduleOutputs'>,
  cornerImageDataUrl?: string
): void {
  const doc = new jsPDF({ format: 'a4', unit: 'pt' });
  const margin = 40;
  const pageW = doc.internal.pageSize.getWidth();
  let y = margin;
  const lineHeight = 14;
  const addText = (text: string, fontSize = 10, bold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, pageW - margin * 2);
    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
  };
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageW, 52, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('IVY WORKBOOK', margin, 34);
  if (cornerImageDataUrl) {
    try {
      const size = 20;
      doc.addImage(cornerImageDataUrl, 'PNG', pageW - margin - size, 6, size, size);
    } catch (_) {
      // ignore if image fails
    }
  }
  doc.setTextColor(0, 0, 0);
  y = 70;
  addText(`${moduleData.pillar === 'pillar-1' ? 'PILLAR I' : moduleData.pillar === 'pillar-2' ? 'PILLAR II' : 'PILLAR III'} — MODULE ${moduleData.order}`, 10, true);
  addText(moduleData.title, 14, true);
  y += 8;
  addText(moduleData.thesis, 10);
  y += 12;
  addText('WHY THIS MODULE EXISTS', 10, true);
  addText(`Academic: ${moduleData.whyExists.academic}`, 9);
  addText(`Operator: ${moduleData.whyExists.operator}`, 9);
  y += 8;
  moduleData.frameworks.forEach((fw) => {
    addText(fw.title, 10, true);
    addText(fw.description, 9);
    y += 4;
  });
  const moduleOutput = state.moduleOutputs?.[moduleId];

  addText('REQUIRED OUTPUTS', 10, true);
  moduleData.requiredOutputs.forEach((req) => {
    const val = req.source
      ? (moduleOutput?.worksheets?.[req.source]?.fields?.[req.id] ?? '—')
      : (moduleOutput?.requiredOutputs?.[req.id] ?? '—');
    addText(`${req.label}: ${String(val)}`, 9);
  });
  y += 8;

  // All worksheet content (every worksheet, every field)
  if (moduleOutput?.worksheets && Object.keys(moduleOutput.worksheets).length > 0) {
    addText('WORKSHEETS', 10, true);
    moduleData.worksheets.forEach((ws) => {
      const wsData = moduleOutput.worksheets[ws.id];
      if (!wsData?.fields) return;
      addText(ws.title, 9, true);
      Object.entries(wsData.fields).forEach(([fieldId, value]) => {
        const field = ws.fields.find((f) => f.id === fieldId);
        const label = field?.label ?? fieldId;
        addText(`  ${label}: ${String(value ?? '—')}`, 9);
      });
      y += 4;
    });
    y += 8;
  }

  if (moduleOutput?.coldCallResponse?.trim()) {
    addText('COLD CALL RESPONSE', 10, true);
    addText(moduleOutput.coldCallResponse.trim(), 9);
    y += 8;
  }
  if (moduleOutput?.redTeamResponse?.trim()) {
    addText('RED TEAM / ENTER RECORD', 10, true);
    addText(moduleOutput.redTeamResponse.trim(), 9);
    y += 8;
  }
  if (moduleOutput?.readingCompanionApplyResponse?.trim()) {
    addText('READING COMPANION — APPLY', 10, true);
    addText(moduleOutput.readingCompanionApplyResponse.trim(), 9);
    y += 8;
  }
  if (moduleOutput?.legitimacyLensResponses && moduleData.legitimacyLens) {
    addText('STRUCTURAL REALITY / LEGITIMACY LENS', 10, true);
    const { whoCouldAttack, whatLooksExploitative, implicitPromise } = moduleData.legitimacyLens;
    const r = moduleOutput.legitimacyLensResponses;
    if (r.whoCouldAttack?.trim()) addText(`${whoCouldAttack}: ${r.whoCouldAttack.trim()}`, 9);
    if (r.whatLooksExploitative?.trim()) addText(`${whatLooksExploitative}: ${r.whatLooksExploitative.trim()}`, 9);
    if (r.implicitPromise?.trim()) addText(`${implicitPromise}: ${r.implicitPromise.trim()}`, 9);
    y += 8;
  }
  if (moduleOutput?.whatWouldChangeIn7Days?.trim()) {
    addText('WHAT WOULD CHANGE IN 7 DAYS', 10, true);
    addText(moduleOutput.whatWouldChangeIn7Days.trim(), 9);
    y += 8;
  }
  if (moduleOutput?.synthesisResponse?.trim()) {
    addText('SYNTHESIS', 10, true);
    addText(moduleOutput.synthesisResponse.trim(), 9);
    y += 8;
  }

  doc.save(`Ivy-Workbook-${moduleData.title.replace(/\s+/g, '-')}-${moduleId}.pdf`);
}

/** Load corner emblem as data URL, then generate PDF. Call this from UI. */
export function exportModulePDFWithCorner(
  moduleData: Module,
  moduleId: string,
  state: Pick<BusinessState, 'moduleOutputs'>
): void {
  fetch('/ivy-pdf-corner.png')
    .then((r) => r.blob())
    .then(
      (blob) =>
        new Promise<string | undefined>((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.readAsDataURL(blob);
        })
    )
    .then((dataUrl) => {
      exportModulePDF(moduleData, moduleId, state, dataUrl);
    })
    .catch(() => {
      exportModulePDF(moduleData, moduleId, state);
    });
}
