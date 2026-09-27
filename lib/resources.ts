import { BrainCircuit, FileText, Globe2, Network } from 'lucide-react'

export const resources = [
  { number: '01', slug: 'ai-bug-bounty-playbook', title: 'AI-BUG-BOUNTY-PLAYBOOK', description: 'Практически playbook за използване на AI подходи при откриване, анализиране и структуриране на bug bounty възможности.', badge: 'TEXT DOCUMENT', icon: FileText, flow: ['DOCUMENT', 'KNOWLEDGE', 'ACTION'], meta: 'FORMAT / TEXT DOCUMENT' },
  { number: '02', slug: 'deutschland-online-business-opportunities-2026', title: 'DEUTSCHLAND ONLINE BUSINESS OPPORTUNITIES 2026', description: 'Бизнес проучване за онлайн възможности в Германия през 2026 г.', badge: 'BUSINESS RESEARCH', icon: Globe2, flow: ['RESEARCH', 'INSIGHT', 'OPPORTUNITY'], meta: 'SCOPE / GERMANY · 2026' },
  { number: '03', slug: 'ai-biznes-narachnik-vzg-v2', title: 'Подобри онлайн бизнеса си с автоматизации и иновативни подходи', description: 'Практически наръчник за подобряване на онлайн бизнес чрез AI, автоматизации, workflows и иновативни подходи.', badge: 'AI • AUTOMATION', icon: BrainCircuit, flow: ['INPUT', 'WORKFLOW', 'GROWTH'], meta: 'TYPE / AI BUSINESS GUIDE' },
  { number: '04', slug: 'biznes-plan-posrednicheski-firmi', title: 'Как да намериш бизнес партньори в чужбина', description: 'Практически материал за изграждане на посреднически бизнес и намиране на бизнес партньори на международни пазари.', badge: 'INTERNATIONAL BUSINESS', icon: Network, flow: ['MARKET', 'MATCH', 'PARTNERSHIP'], meta: 'FOCUS / INTERNATIONAL' },
]
