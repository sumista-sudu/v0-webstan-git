import { pdfEscape, requiredSeller } from '@/lib/commerce'
import type { Order } from '@/lib/commerce'

function buildPdf(lines: string[]) {
  const content = lines.map((line, i) => {
    const font = i === 0 ? '18' : i === 1 ? '12' : '10'
    const y = i === 0 ? 790 : 760 - (i - 2) * 24
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
  const sellerName = requiredSeller('SELLER_NAME', 'Stanislav Iliev')
  const sellerEmail = requiredSeller('SELLER_EMAIL', 'ilievstanislav5@gmail.com')
  const sellerPhone = requiredSeller('SELLER_PHONE', '+359 877 665 447')
  const sellerAddress = requiredSeller('SELLER_ADDRESS', '')
  const sellerUic = requiredSeller('SELLER_UIC', '')
  const sellerVat = requiredSeller('SELLER_VAT_ID', '')

  const date = new Date(order.paidAt ?? order.createdAt).toISOString().slice(0, 10)
  const lines = [
    'INVOICE',
    order.invoiceNumber,
    'Date: ' + date,
    'Seller: ' + sellerName,
    'Email: ' + sellerEmail,
    'Phone: ' + sellerPhone,
    ...(sellerAddress ? ['Address: ' + sellerAddress] : []),
    ...(sellerUic ? ['UIC: ' + sellerUic] : []),
    ...(sellerVat ? ['VAT ID: ' + sellerVat] : []),
    'Customer: ' + order.customerName,
    'Customer email: ' + order.email,
    'Product: ' + order.title,
    'Amount: ' + order.amount + ' ' + order.currency,
    'Status: PAID',
  ]
  return buildPdf(lines)
}
