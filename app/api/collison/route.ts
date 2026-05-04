import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      driverName, gender, age, driverAddress, driverPhone,
      license, registration, vehicleMake, vehicleType, vehicleColour,
      insurer, ownsVehicle, vehicleOwner,
      time, date, location, towTruck,
      witnessName, witnessAddress, witnessPhone,
      constableName, station, reportNumber,
    } = body

    const { error } = await resend.emails.send({
      from: 'ABT Website <onboarding@resend.dev>',
      to: 'admin@autobodytech.net.au',
      subject: `New Collision Form Submission`,
      html: `
        <h2 style="color:#6b8f47">New Collision Form Submission</h2>
        <hr />

        <h3>Other Vehicle</h3>
        <p><strong>Driver's Name:</strong> ${driverName || 'N/A'}</p>
        <p><strong>Male/Female:</strong> ${gender || 'N/A'}</p>
        <p><strong>Approx Age:</strong> ${age || 'N/A'}</p>
        <p><strong>Address:</strong> ${driverAddress || 'N/A'}</p>
        <p><strong>Contact Phone:</strong> ${driverPhone || 'N/A'}</p>
        <p><strong>License:</strong> ${license || 'N/A'}</p>
        <p><strong>Registration:</strong> ${registration || 'N/A'}</p>
        <p><strong>Make of Vehicle:</strong> ${vehicleMake || 'N/A'}</p>
        <p><strong>Type:</strong> ${vehicleType || 'N/A'}</p>
        <p><strong>Colour:</strong> ${vehicleColour || 'N/A'}</p>
        <p><strong>Insurer:</strong> ${insurer || 'N/A'}</p>
        <p><strong>Does driver own vehicle?:</strong> ${ownsVehicle || 'N/A'}</p>
        <p><strong>If NO, who does?:</strong> ${vehicleOwner || 'N/A'}</p>
        <hr />

        <h3>Event Details</h3>
        <p><strong>Time:</strong> ${time || 'N/A'}</p>
        <p><strong>Date:</strong> ${date || 'N/A'}</p>
        <p><strong>Location:</strong> ${location || 'N/A'}</p>
        <p><strong>Tow Truck Driver:</strong> ${towTruck || 'N/A'}</p>
        <hr />

        <h3>Details of Witness</h3>
        <p><strong>Name:</strong> ${witnessName || 'N/A'}</p>
        <p><strong>Address:</strong> ${witnessAddress || 'N/A'}</p>
        <p><strong>Contact Phone:</strong> ${witnessPhone || 'N/A'}</p>
        <hr />

        <h3>Attending Police Officer</h3>
        <p><strong>Constable Name:</strong> ${constableName || 'N/A'}</p>
        <p><strong>Station:</strong> ${station || 'N/A'}</p>
        <p><strong>Report #:</strong> ${reportNumber || 'N/A'}</p>
        <hr />

        <p style="color:#888;font-size:12px">Sent from autobodytech.net.au collision form</p>
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