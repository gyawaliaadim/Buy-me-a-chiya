"use server"

import connectDb from "@/db/connectDb"
import User from "@/models/User"

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const username = searchParams.get('username');
    await connectDb();
    if (username == "null") {
        // console.log(email)
        let u = await User.findOne({ email: email })
        if (u) {
            let user = u.toObject({ flattenObjectIds: true })
            // console.log(user)
            return Response.json({ message: 'User found', user: user });
        }
        else {
            return Response.json({ message: 'Invalid request: both email and username are null', user: null });
        }
    }
    else if (email == "null") {
        let u = await User.findOne({ username: username })
        if (u) {
            let user = u.toObject({ flattenObjectIds: true })

            return Response.json({ message: 'User found', user: user });
        }
        else {
            return Response.json({ message: 'User not found', user: null });
        }
    }
}
