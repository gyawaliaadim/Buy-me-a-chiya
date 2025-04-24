"use server"

import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


// export const initiate = async (amount, to_username, paymentform) => {
//     await connectDb()
//     // fetch the secret of the user who is getting the payment 
//     let user = await User.findOne({username: to_username})
//     const secret = user.razorpaysecret

//     var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })



//     let options = {
//         amount: Number.parseInt(amount),
//         currency: "INR",
//     }

//     let x = await instance.orders.create(options)

//     // create a payment object which shows a pending payment in the database
//     await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })

//     return x

// }


export const fetchuser = async (email) => {
    await connectDb()
    let u = await User.findOne({ email: email })
    if (u){
        let user = u.toObject({ flattenObjectIds: true })
        return user
    }
    else{

        return null;
    }
    
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

export const updateProfile = async (data) => {
    await connectDb()
    let ndata = Object.fromEntries(data)
    // console.log( data)
    // console.log("data is got")
    return (data)
    // // If the username is being updated, check if username is available
    // if (oldusername !== ndata.username) {
    // let u = await User.findOneAndUpdate({ email: ndata.email }, ndata, { new: true })
    // if (!u) {
    //     u = await User.create(ndata)
    // }
    // return u
    //     // Now update all the usernames in the Payments table 
    //     await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})

    // }
    // else{


    //     await User.updateOne({email: ndata.email}, ndata)
    // }


}


