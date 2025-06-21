"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';

//making a buy me a coffee clone
const Demo = () => {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');
    const router = useRouter();
    useEffect(() => {
        if (msg){
            alert(msg);
            router.push("/demo");
        }
    }, [msg,router])
    const Router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [customAmount, setCustomAmount] = useState('');
    const [selected, setSelected] = useState(null); // to highlight the selected button




const onSubmit = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const ndata={
        name: data.name,
        message: data.message,
        amount: customAmount*50,
        to_user: 'demo',
        transaction_uuid: uuidv4(),
    }

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(ndata),
        redirect: "follow"
    };
                
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addPayment`, requestOptions);
    const result = await r.json()

    const GetRequestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
                
    const getRes = Router.push(`${process.env.NEXT_PUBLIC_HOST}/paymentGateway?amount=${encodeURIComponent(ndata.amount)}&uuid=${ndata.transaction_uuid}`, GetRequestOptions)
};

const handleQuickSelect = (val) => {
    setCustomAmount(val);
    setSelected(val);
};

return (
    <div className='flex flex-col justify-start items-center min-h-[200vh] relative'>
        <div className="absolute top-0 cover w-full h-[20vh] flex justify-center items-center z-0">
            <img className="object-cover bg-center" src="/cover.png" />
        </div>
        <div className="top-[300px] info absolute z-10 flex gap-5 flex-wrap ">

            <div className="userInfo w-[600px] h-max flex flex-col justify-start items-center gap-5 p-5 bg-white rounded-2xl shadow-lg">
                <div className="userDetails items-center flex justify-start gap-5 self-start">
                    <div className="profilePicture rounded-[50%] w-15 h-15">
                        <img className='w-auto h-15 rounded-[50%] object-cover bg-center' src="/profilePicture.jpg" alt="" />
                    </div>
                    <div>Aadim Gyawali</div>
                </div>
                <div className="aboutUser w-full flex items-start flex-col ">
                    <h4 className='text-[1.2rem] font-bold text-gray-600'>About Me</h4>
                    <h4>Hi I'm Aadim</h4>
                </div>
                <div className="supporters w-full">

                    <h4 className='text-[1.2rem] font-bold text-gray-600'>About Me</h4>
                    <div className="supporterList flex flex-col overflow-y-auto h-[400px] w-full gap-2">

                        <div className="supporter flex justify-start items-start gap-2 w-full p-2">

                            <div className="profilePicture rounded-[50%] w-10 h-10">
                                <img className='w-auto h-10 rounded-[50%] object-cover bg-center outline-2 outline-blue-400' src="/user.svg" alt="" />
                            </div>
                            <div className="supporterDetails w-full h-full">
                                <div className="supporterInfo"><span className='font-bold'>Jake</span> bought 3 chiya.</div>
                                <div className="message bg-gray-100 rounded-md shadow-md p-3">Hi, this is Jake!</div>
                            </div>
                        </div>
                        <div className="supporter flex justify-start items-start gap-2 w-full p-2">

                            <div className="profilePicture rounded-[50%] w-10 h-10">
                                <img className='w-auto h-10 rounded-[50%] object-cover bg-center outline-2 outline-blue-400' src="/user.svg" alt="" />
                            </div>
                            <div className="supporterDetails w-full h-full">
                                <div className="supporterInfo"><span className='font-bold'>John</span> bought 17 chiya.</div>
                                <div className="message bg-gray-100 rounded-md shadow-md p-3">Hey, Aadim nice work! Keep it up!</div>
                            </div>
                        </div>
                        <div className="supporter flex justify-start items-start gap-2 w-full p-2">

                            <div className="profilePicture rounded-[50%] w-10 h-10">
                                <img className='w-auto h-10 rounded-[50%] object-cover bg-center outline-2 outline-blue-400' src="/user.svg" alt="" />
                            </div>
                            <div className="supporterDetails w-full h-full">
                                <div className="supporterInfo"><span className='font-bold'>Mark</span> bought 2 chiya.</div>
                                <div className="message bg-gray-100 rounded-md shadow-md p-3">Enjoy your chiyas!</div>
                            </div>
                        </div>
                        <div className="supporter flex justify-start items-start gap-2 w-full p-2">

                            <div className="profilePicture rounded-[50%] w-10 h-10">
                                <img className='w-auto h-10 rounded-[50%] object-cover bg-center outline-2 outline-blue-400' src="/user.svg" alt="" />
                            </div>
                            <div className="supporterDetails w-full h-full">
                                <div className="supporterInfo"><span className='font-bold'>Jack</span> bought 6 chiya.</div>
                                <div className="message bg-gray-100 rounded-md shadow-md p-3">Loved your work!</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="payment w-[600px] h-max flex flex-col justify-start items-center gap-5 p-5 bg-white rounded-2xl shadow-lg">
                <h2>Buy Aadim a chiya</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full h-full mx-auto p-4 flex flex-col gap-5 justify-start items-center"
                >
                    {/* Coffee Amount */}
                    <div className='w-full flex flex-col justify-center items-center border border-gray-200 bg-gray-50 rounded-2xl p-5'>
                        <div className='flex'>
                            <label className="text-5xl text-gray-400">☕ x &nbsp;</label>
                            <div className="flex gap-3 mt-2">
                                {['1', '3', '5'].map((value) => (
                                    <button
                                        type="button"
                                        key={value}
                                        onClick={() => handleQuickSelect(value)}
                                        className={`cursor-pointer rounded-full w-15 px-5 py-3 flex justify-center items-center bg-gray-200 transition font-bold text-[20px]
                ${selected === value ? 'bg-yellow-500 text-white' : 'bg-gray-200 '}
              `}
                                    >
                                        {value}
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    placeholder="10"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setSelected(null); // unselect preset if typing manually
                                    }}
                                    className="rounded-full px-5 py-3 border text-[20px] w-min bg-gray-200"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        </div>
                        {(customAmount < 1 || customAmount > 1000) && (
                            <h3 className="text-red-500  text-[15px]">
                                Amount must be between 1 and 100.
                            </h3>
                        )}
                    </div>

                    {/* Name */}
                    <div className='w-full'>
                        <input
                            type="text"
                            placeholder="Name or @yoursocial"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full border p-2 rounded bg-gray-200 border-none"
                        />
                        {errors.name && (
                            <h3 className="text-red-500 mt-1">{errors.name.message}</h3>
                        )}
                    </div>

                    {/* Message */}
                    <div className='w-full'>
                        <textarea
                            placeholder="Say something nice..."
                            {...register('message', {
                                required: 'Message can’t be empty',
                                maxLength: { value: 200, message: 'Keep it under 200 chars' },
                            })}
                            className="w-full border p-2 rounded bg-gray-200 border-none"
                            rows={3}
                        />
                        {errors.message && (
                            <h3 className="text-red-500 mt-1">{errors.message.message}</h3>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-[20px] font-bold text-white cursor-pointer py-2 w-max px-5 rounded-full transition"
                    >
                        Support {customAmount && `Rs ${customAmount * 50}`}
                    </button>
                </form>
            </div>
        </div>



    </div>
)
}

export default Demo