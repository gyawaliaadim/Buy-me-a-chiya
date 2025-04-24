"use server"

import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');
    // console.log(user)
    await connectDb();
    try {

        let p = await Payment.find({ status: true, to_user: user });

        if (p) {
            let payments = p.map((payment) => payment.toObject({ flattenObjectIds: true }));
            // console.log(payments)
            return Response.json({ message: 'Payments', payments: payments });
        }
        else {
            return Response.json({ message: 'Payments not found', payments: null });
        }
    }
    catch (e) {
        return Response.json({ message: 'Invalid request', payments: false });
    }
}

