'use client';

import Link from 'next/link';
import { useBusinessState } from '@/store/useBusinessState';
import { getModulesInOrder } from '@/data/all-modules';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import StrategyNoteForm from '@/components/StrategyNoteForm';
import StakeholderMap from '@/components/StakeholderMap';
import BoardPushbackCards from '@/components/BoardPushbackCards';
import ColdCallDefense from '@/components/ColdCallDefense';
import ThesisLedger from '@/components/ThesisLedger';
import StudioMode from '@/components/StudioMode';

export default function BoardMemoPage() {
  const { state } = useBusinessState();
  const modules = getModulesInOrder();
  const [memo, setMemo] = useState('');
  const [activeTab, setActiveTab] = useState<'memo' | 'strategy-note' | 'stakeholder' | 'pushback' | 'thesis-ledger' | 'studio'>('memo');

  const generateMemo = () => {
    let memoContent = `# Strategic Board Memo\n\n`;
    memoContent += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    memoContent += `Board Credibility Score: ${state.boardCredibilityScore}/100\n`;
    if (state.boardMemoRubricScore != null) {
      memoContent += `Strategy Note Rubric Score: ${state.boardMemoRubricScore}/100\n`;
    }
    memoContent += `\n---\n\n`;

    // Strategy Note (2-page locked form)
    if (state.strategyNote) {
      memoContent += `## Strategy Note\n\n`;
      memoContent += `**Thesis:** ${state.strategyNote.thesis}\n\n`;
      memoContent += `**Evidence:**\n`;
      (state.strategyNote.evidence || []).forEach((e) => { memoContent += `- ${e}\n`; });
      memoContent += `\n**Tradeoffs:**\n`;
      (state.strategyNote.tradeoffs || []).forEach((t) => { memoContent += `- ${t}\n`; });
      memoContent += `\n**Risks:**\n`;
      (state.strategyNote.risks || []).forEach((r) => { memoContent += `- ${r}\n`; });
      memoContent += `\n**Mitigations:**\n`;
      (state.strategyNote.mitigations || []).forEach((m) => { memoContent += `- ${m}\n`; });
      memoContent += `\n**Decision:** ${state.strategyNote.decision}\n`;
      if (state.strategyNote.whatWouldChangeIn7Days) {
        memoContent += `\n**What would you do Monday?** ${state.strategyNote.whatWouldChangeIn7Days}\n`;
      }
      memoContent += `\n---\n\n`;
    }

    // Strategic Thesis Ledger
    if (state.strategicThesisLedger && state.strategicThesisLedger.length > 0) {
      memoContent += `## Strategic Thesis Ledger\n\n`;
      state.strategicThesisLedger.forEach((line, i) => {
        memoContent += `${i + 1}. ${line}\n`;
      });
      memoContent += `\n---\n\n`;
    }

    // Executive Summary
    memoContent += `## Executive Summary\n\n`;
    memoContent += `This memo compiles strategic outputs from Pillar I: Strategic Foundations.\n\n`;

    // Economic Constraints
    if (state.economicConstraints.unitEconomics) {
      memoContent += `## Unit Economics\n\n`;
      const ue = state.economicConstraints.unitEconomics;
      memoContent += `- Price: $${ue.price}\n`;
      memoContent += `- Variable Costs: $${ue.variableCosts}\n`;
      memoContent += `- Contribution Margin: $${ue.contributionMargin}\n\n`;
    }

    if (state.economicConstraints.ltvCac) {
      const ltvCac = state.economicConstraints.ltvCac;
      memoContent += `## LTV:CAC Analysis\n\n`;
      memoContent += `- LTV: $${ltvCac.ltv.toFixed(2)}\n`;
      memoContent += `- CAC: $${ltvCac.cac}\n`;
      memoContent += `- Ratio: ${ltvCac.ratio.toFixed(2)}x\n`;
      memoContent += `- Payback Period: ${ltvCac.paybackPeriod.toFixed(1)} months\n\n`;
    }

    // Module Outputs
    memoContent += `## Module Outputs\n\n`;
    modules.forEach((module) => {
      const output = state.moduleOutputs[module.id];
      if (output && output.completed) {
        memoContent += `### ${module.title}\n\n`;
        
        if (output.coldCallResponse) {
          memoContent += `**Cold Call Response:** ${output.coldCallResponse}\n\n`;
        }
        
        if (output.redTeamResponse) {
          memoContent += `**Red Team Response:** ${output.redTeamResponse}\n\n`;
        }

        // Required outputs
        if (output.requiredOutputs) {
          memoContent += `**Key Decisions:**\n`;
          Object.entries(output.requiredOutputs).forEach(([key, value]) => {
            if (value) {
              memoContent += `- ${key}: ${value}\n`;
            }
          });
          memoContent += `\n`;
        }
      }
    });

    // Experiments
    if (state.controlLogic?.experiments && state.controlLogic.experiments.length > 0) {
      memoContent += `## Active Experiments\n\n`;
      state.controlLogic.experiments.forEach((exp) => {
        memoContent += `### ${exp.hypothesis}\n`;
        memoContent += `- Status: ${exp.status}\n`;
        memoContent += `- Primary Metric: ${exp.primaryMetric}\n`;
        memoContent += `- Guardrail: ${exp.guardrail}\n`;
        memoContent += `- Decision Date: ${exp.decisionDate}\n\n`;
      });
    }

    memoContent += `---\n\n`;
    memoContent += `*This memo was generated by the Ivy Strategic Logic Engine.*\n`;

    setMemo(memoContent);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([memo], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `board-memo-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Strategic Board Memo', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Date and Credibility
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
    doc.text(`Board Credibility: ${state.boardCredibilityScore}/100`, pageWidth - margin, y, { align: 'right' });
    y += 15;

    // Content
    doc.setFontSize(11);
    const lines = memo.split('\n');
    
    lines.forEach((line) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      if (line.startsWith('# ')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text(line.substring(2), margin, y);
        y += 10;
      } else if (line.startsWith('## ')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(line.substring(3), margin, y);
        y += 8;
      } else if (line.startsWith('### ')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(line.substring(4), margin, y);
        y += 6;
      } else if (line.startsWith('- ')) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('• ' + line.substring(2), margin + 5, y);
        y += 5;
      } else if (line.trim() === '---') {
        y += 5;
      } else if (line.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const splitText = doc.splitTextToSize(line, pageWidth - 2 * margin);
        doc.text(splitText, margin, y);
        y += splitText.length * 5;
      } else {
        y += 3;
      }
    });

    doc.save(`board-memo-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-ink mb-8">Board Memo & Strategy Note</h1>

        <div className="flex flex-wrap gap-1 border-b border-charcoal/20 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('memo')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'memo' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Board Memo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('strategy-note')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'strategy-note' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Strategy Note
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stakeholder')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'stakeholder' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Stakeholder Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pushback')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'pushback' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Board Pushback
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('thesis-ledger')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'thesis-ledger' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Thesis Ledger
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('studio')}
            className={`label-small-caps px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm ${activeTab === 'studio' ? 'border-b-2 border-ink text-ink' : 'text-charcoal/60 hover:text-ink'}`}
          >
            Studio
          </button>
        </div>

        {activeTab === 'strategy-note' && (
          <div className="command-center p-6 mb-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <StrategyNoteForm />
            <ColdCallDefense />
          </div>
        )}
        {activeTab === 'stakeholder' && (
          <div className="command-center p-6 mb-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <StakeholderMap />
          </div>
        )}
        {activeTab === 'pushback' && (
          <div className="command-center p-6 mb-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <BoardPushbackCards />
          </div>
        )}
        {activeTab === 'thesis-ledger' && (
          <div className="command-center p-6 mb-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <ThesisLedger />
          </div>
        )}
        {activeTab === 'studio' && (
          <div className="mb-6">
            <StudioMode memoContent={memo} />
          </div>
        )}

        <div className="command-center rounded-lg p-6 mb-6">
          <button
            onClick={generateMemo}
            className="btn-dark px-6 py-3 rounded-sm transition-all mb-4"
          >
            Generate Memo
          </button>
          
          {memo && (
            <div className="mt-6">
              <div className="flex justify-end gap-3 mb-4">
                <button
                  onClick={downloadMarkdown}
                  className="bg-sage text-white px-4 py-2 rounded-sm hover:bg-sage/80 transition-all"
                >
                  Download Markdown
                </button>
                <button
                  onClick={downloadPDF}
                  className="btn-dark px-4 py-2 rounded-sm transition-all"
                >
                  Download PDF
                </button>
              </div>
              <div className="bg-white border border-charcoal/20 rounded-sm p-6">
                <pre className="font-mono text-sm whitespace-pre-wrap text-charcoal">
                  {memo}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-charcoal/20">
          <Link
            href="/"
            className="label-small-caps inline-flex items-center gap-2 text-charcoal/70 hover:text-ink border border-charcoal/20 px-4 py-2"
          >
            ← Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
