import { list, get, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { MyPOSClient } from 'mypos-online-checkout'
import { resources } from '@/lib/resources'

export type Resource = (typeof resources)[number]

export type Order = {
  id: string
  slug: string
  title: string
  email: string
  customerName: string
  amount: string
  currency: string
  productPath: string
  status: 'PENDING' | 'PAID' | 'DELIVERY_FAILED'
  createdAt: string
  paidAt?: string
  deliverySentAt?: string
  invoiceNumber: string
  transactionRef?: string
}

function env(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback
  return value?.trim() ?? ''
}

function requiredEnv(name: string) {
  const value = env(name)
  if (!value) throw new Error('Missing environment variable: ' + name)
  return value
}

export function getSiteUrl() {
  return env('NEXT_PUBLIC_SITE_URL', 'https://v0-webstan.vercel.app').replace(/\/$/, '')
}

export function getCurrency() {
  return env('MYPOS_CURRENCY', 'EUR').toUpperCase()
}

export function parseAmount(value: string) {
  const amount = Number(value.replace(',', '.'))
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Invalid product price')
  return amount.toFixed(2)
}

export function getPrice(resource: Resource) {
  const value = env(resource.priceEnv)
  if (!value) return null
  return parseAmount(value)
}

function transliterate(value: string) {
  const map: Record<string, string> = {
    а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ж:'zh', з:'z', и:'i', й:'y', к:'k', л:'l',
    м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'h', ц:'ts', ч:'ch',
    ш:'sh', щ:'sht', ъ:'a', ь:'y', ю:'yu', я:'ya',
  }
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .split('')
    .map((c) => map[c.toLowerCase()] ? (c === c.toUpperCase() ? map[c.toLowerCase()].toUpperCase() : map[c.toLowerCase()]) : c)
    .join('')
}

function normalize(value: string) {
  return transliterate(value)
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function findProductBlob(resource: Resource) {
  const aliases = resource.assetAliases.map(normalize)
  const { blobs } = await list({ limit: 1000 })
  const pdfs = blobs.filter((blob) => /\.pdf$/i.test(blob.pathname))

  let best: { score: number; pathname: string } | null = null
  for (const blob of pdfs) {
    const name = normalize(blob.pathname.replace(/\\.pdf$/i, ''))
    let score = 0
    for (const alias of aliases) {
      if (!alias) continue
      if (name === alias) score = Math.max(score, 100)
      else if (name.includes(alias)) score = Math.max(score, 80)
      else {
        const aliasTokens = alias.split(' ').filter(Boolean)
        const hits = aliasTokens.filter((token) => name.includes(token)).length
        score = Math.max(score, Math.min(70, hits * 10))
      }
    }
    if (!best || score > best.score) best = { score, pathname: blob.pathname }
  }

  if (!best || best.score < 30) {
    throw new Error('Product PDF not found in the connected private Blob store')
  }
  return best.pathname
}

export async function saveOrder(order: Order) {
  await put('orders/' + order.id + '.json', JSON.stringify(order), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

export async function readOrder(orderId: string) {
  const result = await get('orders/' + orderId + '.json', { access: 'private', useCache: false })
  const text = await new Response(result.stream).text()
  return JSON.parse(text) as Order
}

export async function readPrivatePdf(pathname: string) {
  const result = await get(pathname, { access: 'private' })
  const buffer = Buffer.from(await new Response(result.stream).arrayBuffer())
  return { buffer, contentType: result.blob.contentType ?? 'application/pdf' }
}

export function splitCustomerName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return { firstNames: parts[0], familyName: parts[0] }
  return { firstNames: parts.slice(0, -1).join(' '), familyName: parts[parts.length - 1] }
}

function orderedValues(fields: Record<string, string>) {
  return Object.entries(fields).map(([, value]) => String(value))
}

export function getMyPosClient() {
  const privateKey = requiredEnv('MYPOS_PRIVATE_KEY').replace(/\\n/g, '\n')
  const publicKey = requiredEnv('MYPOS_PUBLIC_KEY').replace(/\\n/g, '\n')
  return new MyPOSClient({
    storeId: requiredEnv('MYPOS_STORE_ID'),
    storePassword: requiredEnv('MYPOS_STORE_PASSWORD'),
    keyIndex: Number(requiredEnv('MYPOS_KEY_INDEX')),
    privateKey,
    publicKey,
    isSandbox: env('MYPOS_SANDBOX', 'true').toLowerCase() === 'true',
  })
}

export function getMyPosEndpoint() {
  return getMyPosClient().checkoutUrl
}

export function newOrderId() {
  return randomUUID().replace(/-/g, '')
}

export function requiredSeller(name: string, fallback: string) {
  return env(name, fallback)
}

export function pdfEscape(value: string) {
  return transliterate(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}
