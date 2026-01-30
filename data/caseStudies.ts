import { CaseStudy } from '@/types/context';

export const caseStudies: CaseStudy[] = [
  {
    id: 'airbnb-2012',
    name: 'Airbnb',
    period: '2012 (Early Growth)',
    description: 'Marketplace connecting hosts and travelers. Pre-IPO, scaling trust and supply.',
    category: 'Marketplace / Two-Sided Network',
    prefillData: {
      'module-1': {
        'worksheet-1-1': {
          'advantage-source': ['Network effects', 'Switching costs'],
          'time-to-replicate': '12-36 months',
          'founder-dependency': 'Works without founder involvement',
          'replication-cost': '$1M+',
        },
      },
    },
  },
  {
    id: 'peloton-pre-collapse',
    name: 'Peloton',
    period: 'Pre-Collapse (2019)',
    description: 'Connected fitness hardware + content subscription. High CAC, premium positioning.',
    category: 'Hardware + SaaS / DTC',
  },
  {
    id: 'notion',
    name: 'Notion',
    period: '2020-2022 (Product-Led Growth)',
    description: 'All-in-one workspace tool. Viral loops, freemium model, community-driven.',
    category: 'B2B SaaS / Product-Led',
  },
  {
    id: 'warby-parker',
    name: 'Warby Parker',
    period: '2010-2015 (DTC Disruption)',
    description: 'Eyewear DTC brand. Disrupting traditional retail, home try-on, vertical integration.',
    category: 'DTC / E-commerce',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    period: '2015-2020 (Platform Expansion)',
    description: 'E-commerce platform for SMBs. Ecosystem play, app marketplace, merchant success.',
    category: 'B2B SaaS / Platform',
  },
  {
    id: 'theranos',
    name: 'Theranos',
    period: '2013-2015 (Before Exposure)',
    description: 'Failed health tech startup. Misrepresented technology, regulatory issues, founder dependency.',
    category: 'Health Tech / Failed',
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(caseStudy => caseStudy.id === id);
}
