import type { Order } from '@/lib/commerce'
import { getLegalConfig } from '@/lib/legal'

export async function sendOrderEmail(order: Order, productBuffer: Buffer, invoiceBuffer: Buffer) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from) throw new Error('Missing RESEND_API_KEY or RESEND_FROM_EMAIL')

  const legal = getLegalConfig()
  const safeName = order.customerName.replace(/[<>]/g, '')

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
      reply_to: [legal.email],
      subject: 'Поръчката ти е потвърдена — ' + order.title,
      html: [
        '<p>Здравейте, ' + safeName + '.</p>',
        '<p>Плащането е потвърдено от myPOS. Този имейл е потвърждение на покупката на траен носител.</p>',
        '<p><strong>Продукт:</strong> ' + order.title + '<br><strong>Количество:</strong> 1<br><strong>Обща цена:</strong> ' + order.amount + ' ' + order.currency + '<br><strong>Поръчка:</strong> ' + order.id + '</p>',
        '<p><strong>Доставка:</strong> PDF по имейл след потвърдено плащане. <strong>Формат:</strong> PDF текстов документ; стандартен PDF четец е достатъчен.</p>',
        '<p>Приложени са дигиталният продукт PDF и документът за покупката.</p>',
        '<p>Вашето изрично съгласие за започване на дигиталната доставка е записано на: ' + new Date(order.digitalContentConsentAt).toISOString() + '.</p>',
        '<p>Условия: <a href="' + (process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-webstan.vercel.app') + '/legal#terms">Общи условия</a> · <a href="' + (process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-webstan.vercel.app') + '/legal#withdrawal">Отказ</a> · <a href="' + (process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-webstan.vercel.app') + '/legal#privacy">Поверителност</a> · <a href="' + (process.env.NEXT_PUBLIC_SITE_URL || 'https://v0-webstan.vercel.app') + '/legal/withdrawal-form">Формуляр за отказ</a>.</p>',
        '<p>Поздрави,<br>' + legal.sellerName + '</p>',
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
