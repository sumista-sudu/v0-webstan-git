import { pdfEscape, requiredSeller } from '@/lib/commerce'
import { getLegalConfig } from '@/lib/legal'
import type { Order } from '@/lib/commerce'

function buildPdf(lines: string[]) {
  const content = lines.map((line, i) => {
    const font = i === 0 ? '18' : i === 1 ? '12' : '10'
    const y = 790 - Math.max(0, i - 2) * 24
    return 'BT /F1 ' + font + ' Tf 50 ' + y + ' Td (' + pdfEscape(line) + ') Tj ET'
  }).join('\\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    '<< /Length ' + Buffer.byteLength(content, 'utf8') + ' >>\\nstream\\n' + content + '\\nendstream',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  ]

  let pdf = '%PDF-1.4\\n'
  const offsets = [0]
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'))
    pdf += (i + 1) + ' 0 obj\\n' + objects[i] + '\\nendobj\\n'
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8')
  pdf += 'xref\\n0 ' + (objects.length + 1) + '\\n0000000000 65535 f \\n'
  for (let i = 1; i <= objects.length; i++) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \\n'
  pdf += 'trailer\\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\\nstartxref\\n' + xrefOffset + '\\n%%EOF'
  return Buffer.from(pdf, 'utf8')
}

export function makeInvoicePdf(order: Order) {
  const legal = getLegalConfig()
  const sellerName = requiredSeller('SELLER_NAME', legal.sellerName)
  const sellerEmail = requiredSeller('SELLER_EMAIL', legal.email)
  const sellerPhone = requiredSeller('SELLER_PHONE', legal.phone)
  const sellerAddress = requiredSeller('SELLER_ADDRESS', legal.address)
  const sellerUic = requiredSeller('SELLER_UIC', legal.registrationNumber)
  const sellerVat = requiredSeller('SELLER_VAT_ID', legal.vatId)

  const date = new Date(order.paidAt ?? order.createdAt).toISOString().slice(0, 10)
  const lines = [
    'INVOICE / SALES DOCUMENT',
    order.invoiceNumber,
    'Date: ' + date,
    'Seller: ' + sellerName,
    'Address: ' + (sellerAddress || 'NOT CONFIGURED'),
    'Email: ' + sellerEmail,
    'Phone: ' + sellerPhone,
    ...(sellerUic ? ['UIC / Reg. no.: ' + sellerUic] : []),
    ...(sellerVat ? ['VAT ID: ' + sellerVat] : []),
    'Customer: ' + order.customerName,
    'Customer email: ' + order.email,
    ...(order.billing ? ['Company: ' + order.billing.companyName, 'Company UIC / Reg. no.: ' + order.billing.uic, ...(order.billing.vatId ? ['Company VAT ID: ' + order.billing.vatId] : []), 'Company address: ' + order.billing.address] : []),
    'Product: ' + order.title,
    'Quantity: 1',
    'Unit price: ' + order.amount + ' ' + order.currency,
    'Total: ' + order.amount + ' ' + order.currency,
    'Tax information: ' + (legal.priceTaxNote || 'See applicable tax treatment.'),
    'Payment: ' + order.paymentMethod,
    'Status: PAID',
  ]
  return buildPdf(lines)
}
