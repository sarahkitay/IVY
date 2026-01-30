import { jsPDF } from 'jspdf';
import { Module } from '@/types';
import { BusinessState } from '@/types';

/**
 * Generate an Ivy-branded PDF for a single module. Used from module page and home page.
 */
export function exportModulePDF(
  moduleData: Module,
  moduleId: string,
  state: Pick<BusinessState, 'moduleOutputs'>
): void {
  const doc = new jsPDF({ format: 'a4', unit: 'pt' });
  const margin = 40;
  let y = margin;
  const lineHeight = 14;
  const addText = (text: string, fontSize = 10, bold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2);
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
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 52, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('IVY WORKBOOK', margin, 34);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Marketing as Value Architecture | Ivy-branded module summary', margin, 46);
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
  addText('REQUIRED OUTPUTS', 10, true);
  const moduleOutput = state.moduleOutputs?.[moduleId];
  moduleData.requiredOutputs.forEach((req) => {
    const val = req.source
      ? (moduleOutput?.worksheets?.[req.source]?.fields?.[req.id] ?? '—')
      : (moduleOutput?.requiredOutputs?.[req.id] ?? '—');
    addText(`${req.label}: ${String(val)}`, 9);
  });
  doc.save(`Ivy-Workbook-${moduleData.title.replace(/\s+/g, '-')}-${moduleId}.pdf`);
}
