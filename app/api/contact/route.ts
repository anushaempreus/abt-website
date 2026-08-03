import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { sanitizeFormBody } from '../utils'

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
  }
  const resend = new Resend(apiKey)
  try {
    const body = sanitizeFormBody(await req.json())
    if (body.website) {
      // honeypot filled — silently accept so bots don't learn
      return NextResponse.json({ success: true })
    }
    const { name, email, phone, mobile, make, model, year, message } = body

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? 'ABT Website <onboarding@resend.dev>',
      to: process.env.CONTACT_RECIPIENT ?? 'admin@autobodytech.net.au',
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      html: `
        <h2 style="color:#6b8f47">New Contact Form Submission</h2>
        <hr />
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Mobile:</strong> ${mobile || 'N/A'}</p>
        <hr />
        <h3>Vehicle Information</h3>
        <p><strong>Make:</strong> ${make || 'N/A'}</p>
        <p><strong>Model:</strong> ${model || 'N/A'}</p>
        <p><strong>Year:</strong> ${year || 'N/A'}</p>
        <hr />
        <h3>Message</h3>
        <p>${message}</p>
        <hr />
        <p style="color:#888;font-size:12px">Sent from autobodytech.net.au contact form</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}