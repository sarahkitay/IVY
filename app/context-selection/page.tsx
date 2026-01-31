'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/useProjectStore';
import { ApplicationContext, CaseStudy } from '@/types/context';
import { caseStudies } from '@/data/caseStudies';

export default function ContextSelectionPage() {
  const router = useRouter();
  const createProject = useProjectStore((s) => s.createProject);
  const [selectedType, setSelectedType] = useState<'my-company' | 'case-study' | 'hypothetical' | 'observer' | null>(null);
  const [saving, setSaving] = useState(false);
  const [myCompanyData, setMyCompanyData] = useState({
    businessType: 'startup' as 'startup' | 'employer' | 'client' | 'side-project',
    companyName: '',
    description: '',
  });
  const [selectedCase, setSelectedCase] = useState<string>('');
  const [hypotheticalData, setHypotheticalData] = useState({
    businessDescription: '',
    category: '',
  });

  const getProjectName = (context: ApplicationContext): string => {
    switch (context.type) {
      case 'my-company': return context.companyName;
      case 'case-study': return context.caseName;
      case 'hypothetical': return context.category;
      case 'observer': return 'Observer Mode';
      default: return 'New Project';
    }
  };

  const handleContinue = async () => {
    if (!selectedType) return;

    let context: ApplicationContext;

    switch (selectedType) {
      case 'my-company':
        if (!myCompanyData.companyName || !myCompanyData.description) {
          alert('Please provide company name and description.');
          return;
        }
        context = {
          type: 'my-company',
          ...myCompanyData,
        };
        break;
      case 'case-study':
        if (!selectedCase) {
          alert('Please select a case study.');
          return;
        }
        const caseStudy = caseStudies.find(c => c.id === selectedCase);
        if (!caseStudy) return;
        context = {
          type: 'case-study',
          caseId: selectedCase,
          caseName: caseStudy.name,
        };
        break;
      case 'hypothetical':
        if (!hypotheticalData.businessDescription || !hypotheticalData.category) {
          alert('Please provide business description and category.');
          return;
        }
        context = {
          type: 'hypothetical',
          ...hypotheticalData,
        };
        break;
      case 'observer':
        context = { type: 'observer' };
        break;
      default:
        return;
    }

    setSaving(true);
    try {
      const name = getProjectName(context);
      await createProject(name, context);
      router.push('/');
    } catch (e) {
      console.error('Create project error:', e);
      const msg = e instanceof Error ? e.message : String(e);
      alert(`Failed to create project: ${msg}\n\nCheck: Firebase Console → Firestore → Rules (allow authenticated writes); Firestore → Indexes if you see an index link in the error.`);
    } finally {
      setSaving(false);
    }
  };

  const getContextLabel = (context: ApplicationContext | undefined): string => {
    if (!context) return '';
    switch (context.type) {
      case 'my-company':
        return context.companyName;
      case 'case-study':
        return `${context.caseName} (${caseStudies.find(c => c.id === context.caseId)?.period || ''})`;
      case 'hypothetical':
        return context.category;
      case 'observer':
        return 'Observer Mode';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <a href="/dashboard" className="inline-flex items-center gap-3 mb-6" aria-label="IVY dashboard">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="shrink-0 flex items-center justify-center -translate-y-0.5">
              <img src="/ivy-corner-logo.png" alt="" className="h-12 w-12 object-contain" />
            </span>
            <span className="font-cinzel-decorative font-bold text-xl uppercase text-ink">IVY</span>
          </a>
          <a href="/dashboard" className="label-small-caps text-charcoal/60 hover:text-ink text-sm block mb-4">
            ← Back to Dashboard
          </a>
          <h1 className="tier-1-gravitas text-2xl sm:text-4xl mb-4">Choose Your Application Context</h1>
          <p className="tier-2-instruction text-lg long-text mb-2">
            This system teaches marketing by forcing real-world constraints.
          </p>
          <p className="tier-3-guidance">
            You will apply every framework to a specific business or case. Abstract answers are not accepted.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* My Company / Client */}
          <button
            onClick={() => setSelectedType('my-company')}
            className={`w-full text-left command-center p-6 transition-all ${
              selectedType === 'my-company' ? 'border-l-4 border-oxblood' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="tier-1-gravitas text-xl mb-2">Apply to My Company</h3>
                <p className="tier-2-instruction text-sm mb-2">
                  I am applying this to a real business I work on.
                </p>
                <p className="tier-3-guidance text-xs">
                  Startup • Employer • Client • Side project
                </p>
              </div>
              {selectedType === 'my-company' && <span className="text-oxblood">✓</span>}
            </div>
          </button>

          {selectedType === 'my-company' && (
            <div className="command-center p-6 ml-8">
              <div className="space-y-4">
                <div>
                  <label className="label-small-caps mb-2 block">BUSINESS TYPE</label>
                  <select
                    value={myCompanyData.businessType}
                    onChange={(e) => setMyCompanyData({ ...myCompanyData, businessType: e.target.value as any })}
                    className="w-full worksheet-field"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="startup">Startup</option>
                    <option value="employer">Employer</option>
                    <option value="client">Client</option>
                    <option value="side-project">Side Project</option>
                  </select>
                </div>
                <div>
                  <label className="label-small-caps mb-2 block">COMPANY NAME</label>
                  <input
                    type="text"
                    value={myCompanyData.companyName}
                    onChange={(e) => setMyCompanyData({ ...myCompanyData, companyName: e.target.value })}
                    className="w-full worksheet-field"
                    placeholder="State facts only. No adjectives."
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label className="label-small-caps mb-2 block">DESCRIPTION</label>
                  <textarea
                    value={myCompanyData.description}
                    onChange={(e) => setMyCompanyData({ ...myCompanyData, description: e.target.value })}
                    className="w-full worksheet-field min-h-[100px]"
                    placeholder="What does this business do? State facts only."
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Case Study */}
          <button
            onClick={() => setSelectedType('case-study')}
            className={`w-full text-left command-center p-6 transition-all ${
              selectedType === 'case-study' ? 'border-l-4 border-oxblood' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="tier-1-gravitas text-xl mb-2">Analyze a Case Study</h3>
                <p className="tier-2-instruction text-sm mb-2">
                  I am learning by analyzing a known company.
                </p>
                <p className="tier-3-guidance text-xs">
                  This is how most Ivy marketing is taught.
                </p>
              </div>
              {selectedType === 'case-study' && <span className="text-oxblood">✓</span>}
            </div>
          </button>

          {selectedType === 'case-study' && (
            <div className="command-center p-6 ml-8">
              <label className="label-small-caps mb-2 block">SELECT CASE STUDY</label>
              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
                className="w-full worksheet-field"
                style={{ borderRadius: 0 }}
              >
                <option value="">Select a case study...</option>
                {caseStudies.map((caseStudy) => (
                  <option key={caseStudy.id} value={caseStudy.id}>
                    {caseStudy.name} ({caseStudy.period}) — {caseStudy.category}
                  </option>
                ))}
              </select>
              {selectedCase && (
                <div className="mt-4 pt-4 border-t border-charcoal/10">
                  {(() => {
                    const caseStudy = caseStudies.find(c => c.id === selectedCase);
                    if (!caseStudy) return null;
                    return (
                      <div>
                        <p className="tier-2-instruction text-sm mb-2">{caseStudy.description}</p>
                        <p className="tier-3-guidance text-xs">{caseStudy.category}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Hypothetical */}
          <button
            onClick={() => setSelectedType('hypothetical')}
            className={`w-full text-left command-center p-6 transition-all ${
              selectedType === 'hypothetical' ? 'border-l-4 border-oxblood' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="tier-1-gravitas text-xl mb-2">Practice with a Hypothetical Business</h3>
                <p className="tier-2-instruction text-sm mb-2">
                  I am practicing by constructing a business.
                </p>
                <p className="tier-3-guidance text-xs">
                  Still rigorous, still constrained.
                </p>
              </div>
              {selectedType === 'hypothetical' && <span className="text-oxblood">✓</span>}
            </div>
          </button>

          {selectedType === 'hypothetical' && (
            <div className="command-center p-6 ml-8">
              <div className="space-y-4">
                <div>
                  <label className="label-small-caps mb-2 block">CATEGORY</label>
                  <input
                    type="text"
                    value={hypotheticalData.category}
                    onChange={(e) => setHypotheticalData({ ...hypotheticalData, category: e.target.value })}
                    className="w-full worksheet-field"
                    placeholder="e.g., B2B SaaS for HR compliance"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label className="label-small-caps mb-2 block">BUSINESS DESCRIPTION</label>
                  <textarea
                    value={hypotheticalData.businessDescription}
                    onChange={(e) => setHypotheticalData({ ...hypotheticalData, businessDescription: e.target.value })}
                    className="w-full worksheet-field min-h-[100px]"
                    placeholder="Describe the business model. State facts only."
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Observer Mode */}
          <button
            onClick={() => setSelectedType('observer')}
            className={`w-full text-left command-center p-6 transition-all ${
              selectedType === 'observer' ? 'border-l-4 border-oxblood' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="tier-1-gravitas text-xl mb-2">Observe Frameworks (Read-Only)</h3>
                <p className="tier-2-instruction text-sm mb-2">
                  I am here to understand frameworks before applying them.
                </p>
                <p className="tier-3-guidance text-xs">
                  Worksheets become guided examples. Inputs are pre-filled. You cannot complete modules.
                </p>
              </div>
              {selectedType === 'observer' && <span className="text-oxblood">✓</span>}
            </div>
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <a href="/dashboard" className="btn-formal bg-charcoal/10 text-ink hover:bg-charcoal/20 inline-flex items-center justify-center">
            Back to Dashboard
          </a>
          <button
            onClick={handleContinue}
            disabled={!selectedType || saving}
            className="btn-formal"
          >
            {saving ? 'Saving…' : 'Continue to Modules'}
          </button>
        </div>
      </div>
    </div>
  );
}
