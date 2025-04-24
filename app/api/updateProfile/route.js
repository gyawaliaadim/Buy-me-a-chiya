"use server"

import connectDb from "@/db/connectDb"
import User from "@/models/User"

export async function POST(req) {
     try{
        await connectDb()
        const body = await req.json();
        // const data = Object.(body);
        console.log(body)

        const updatedUser = await User.findOneAndUpdate(
            { email: body.email },       // filter (old data or ID)
            { $set: body },     // fields you wanna update
            { upsert: true, new: true }          // returns updated doc
        );
        console.log(updatedUser)
        // console.log("update Profile: ", updatedUser)
        if (updatedUser) {
            return new Response(JSON.stringify({ success: true, message: "Profile Updated Successfully", newData: updatedUser }));
        } else {
            console.error("Error updating user");
            return new Response(JSON.stringify({ success: false, message: "Something Went Wrong", newData: null }));
        }
        }
        catch (error) {
            console.error("Error:", error);
            return new Response(JSON.stringify({ success: false, message: "Internal Server Error", newData: null }));
        }
    


}
