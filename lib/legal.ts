export type LegalConfig = {
  sellerName: string
  email: string
  phone: string
  address: string
  registrationNumber: string
  vatId: string
  country: string
  priceTaxNote: string
  deliveryPolicy: string
  policyVersion: string
}

function env(name: string, fallback = '') {
  return (process.env[name] ?? fallback).trim()
}

export function getLegalConfig(): LegalConfig {
  return {
    sellerName: env('SELLER_NAME', 'Stanislav Iliev'),
    email: env('SELLER_EMAIL', 'ilievstanislav5@gmail.com'),
    phone: env('SELLER_PHONE', '+359 877 665 447'),
    address: env('SELLER_ADDRESS'),
    registrationNumber: env('SELLER_UIC'),
    vatId: env('SELLER_VAT_ID'),
    country: env('SELLER_COUNTRY', 'България'),
    priceTaxNote: env('PRICE_TAX_NOTE'),
    deliveryPolicy: env('DIGITAL_DELIVERY_POLICY', 'При API Checkout дигиталният PDF се изпраща по имейл след server-side потвърждение от myPOS. При фиксирания PayButton за AI-Bug-Bounty-Playbook доставката се извършва след потвърждение на плащането в myPOS и не по-късно от 24 часа.'),
    policyVersion: env('LEGAL_POLICY_VERSION', '2026-09-28'),
  }
}

export function missingLegalConfig(): string[] {
  const legal = getLegalConfig()
  const missing: string[] = []
  if (!legal.sellerName) missing.push('SELLER_NAME')
  if (!legal.email) missing.push('SELLER_EMAIL')
  if (!legal.phone) missing.push('SELLER_PHONE')
  if (!legal.address) missing.push('SELLER_ADDRESS')
  if (!legal.priceTaxNote) missing.push('PRICE_TAX_NOTE')
  return missing
}

export function assertLegalReady() {
  const missing = missingLegalConfig()
  if (missing.length) {
    throw new Error('Продажбата е временно недостъпна: липсва задължителна търговска конфигурация (' + missing.join(', ') + ').')
  }
}
