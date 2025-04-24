"use server"

import connectDb from "@/db/connectDb"
import Payment from "@/models/Payment"
import { NextResponse } from 'next/server';
export async function POST(req) {
    try {
        await connectDb()
        const body = await req.json();
        // const data = Object.(body);
        // console.log(body)

        const newPayment = await Payment.create(body);

        if (newPayment) {
            return new Response(JSON.stringify({ success: true, message: "Payment made Successfully", newData: newPayment }));
        } else {
            console.error("Error updating Payment");
            return new Response(JSON.stringify({ success: false, message: "Something Went Wrong", newData: null }));
        }
    }
    catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error", newData: null }));
    }



}
export async function GET(req) {
    try {
        await connectDb();
        const query = req.nextUrl.searchParams;
        const data = query.get('data');
        const resData = atob(data);
        const parsedData = JSON.parse(resData);
        // console.log("Data parameter:", parsedData);

        const updatedPayment = await Payment.findOneAndUpdate(
            { transaction_uuid: parsedData.transaction_uuid },       // filter (old data or ID)
            { $set: { status: true } },     // fields you wanna update
            { upsert: true, new: true }          // returns updated doc
        );
        if (updatedPayment) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/${updatedPayment.to_user}?msg=Payment Success`);

        } else {

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}?msg=Payment Failure`);
        }
    } catch (error) {

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}?msg=Server Issue`);
    }
}


