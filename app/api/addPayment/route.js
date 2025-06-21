"use server"

import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"

// ✅ Don't import `redirect` here – it's not for API routes

export async function POST(req) {
    console.log(req);
    try {
        await connectDb();
        const body = await req.json();

        const newPayment = await Payment.create(body);

        if (newPayment) {
            return new Response(JSON.stringify({
                success: true,
                message: "Payment made Successfully",
                newData: newPayment
            }));
        } else {
            console.error("Error updating Payment");
            return new Response(JSON.stringify({
                success: false,
                message: "Something Went Wrong",
                newData: null
            }));
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error",
            newData: null
        }));
    }
}

export async function GET(req) {
    try {
        await connectDb();
        const query = req.nextUrl.searchParams;
        const data = query.get('data');
        const resData = atob(data);
        const parsedData = JSON.parse(resData);
        console.log("Parsed Data:", parsedData);

        const updatedPayment = await Payment.findOneAndUpdate(
            { transaction_uuid: parsedData.transaction_uuid },
            { $set: { status: true } },
            { upsert: true, new: true }
        );

        if (updatedPayment) {
            return Response.redirect(`${process.env.NEXT_PUBLIC_HOST}/${updatedPayment.to_user}?msg=Payment Success`, 307);
        } else {
            return Response.redirect(`${process.env.NEXT_PUBLIC_HOST}/demo?msg=Payment Failure`, 307);
        }
    } catch (error) {
        console.log("Error:", error);
        return Response.redirect(`${process.env.NEXT_PUBLIC_HOST}/demo?msg=Server Issue`, 307);
    }
}
