import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone, mobile,
      make, model, year, colour, rego, vin,
      insurer, claimNumber, damage,
    } = body

    const { error } = await resend.emails.send({
      from: 'ABT Website <onboarding@resend.dev>', // change to verified domain later
      to: 'admin@autobodytech.net.au',
      replyTo: email,
      subject: `New Quote Request — ${name}`,
      html: `
        <h2 style="color:#6b8f47">New Quote Request</h2>
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
        <p><strong>Colour:</strong> ${colour || 'N/A'}</p>
        <p><strong>Registration No:</strong> ${rego || 'N/A'}</p>
        <p><strong>VIN:</strong> ${vin || 'N/A'}</p>
        <hr />
        <h3>Insurer Information</h3>
        <p><strong>Insurer:</strong> ${insurer || 'N/A'}</p>
        <p><strong>Claim Number:</strong> ${claimNumber || 'N/A'}</p>
        <hr />
        <h3>Description of Damage</h3>
        <p>${damage || 'N/A'}</p>
        <hr />
        <p style="color:#888;font-size:12px">Sent from autobodytech.net.au quote form</p>
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