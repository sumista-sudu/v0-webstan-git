import type { Order } from '@/lib/commerce'

export async function sendOrderEmail(order: Order, productBuffer: Buffer, invoiceBuffer: Buffer) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) throw new Error('Missing RESEND_API_KEY or RESEND_FROM_EMAIL')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
      'Idempotency-Key': order.id,
    },
    body: JSON.stringify({
      from,
      to: [order.email],
      reply_to: ['ilievstanislav5@gmail.com'],
      subject: 'Поръчката ти е потвърдена — ' + order.title,
      html: [
        '<p>Здравейте, ' + order.customerName.replace(/[<>]/g, '') + '.</p>',
        '<p>Плащането е потвърдено и дигиталният продукт е приложен към този имейл.</p>',
        '<p>Приложени са: продуктът PDF и документът за фактура.</p>',
        '<p>Поздрави,<br>Stanislav Iliev</p>',
      ].join(''),
      attachments: [
        { filename: order.slug + '.pdf', content: productBuffer.toString('base64') },
        { filename: order.invoiceNumber + '.pdf', content: invoiceBuffer.toString('base64') },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('Resend failed: ' + (await response.text()).slice(0, 500))
  }
}
