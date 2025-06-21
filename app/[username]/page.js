"use client";
// This is a client component

import React, { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const Username = ({ params }) => {
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');

  const { username } = use(params)
  const [Username, setUsername] = useState(username);
  const [Payments, setPayments] = useState([])
  const [validUsername, setValidation] = useState(true)
  const Router = useRouter();
  const [User, setUser] = useState({})
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [customAmount, setCustomAmount] = useState('');
  const [selected, setSelected] = useState(null); // to highlight the selected button

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const r = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/fetchUser?username=${encodeURIComponent(Username)}&email=null`,
          requestOptions
        );
        const userInfo = await r.json();

        if (userInfo.user) {
          setValidation("true")
          setUser(userInfo.user)
        } else {
          setValidation("false")
          alert("User not found")

          Router.push("/")
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchSupporters = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetchPayments?user=${encodeURIComponent(Username)}`, requestOptions);
        const p = await r.json();
        setPayments(p.payments)
        // console.log(typeo)
        console.log( p.payments)
      }
      catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (msg) {
      alert(msg)
      Router.push(`/${Username}`)
    }
    if (Username) {
      fetchData().then(() => {
        fetchSupporters()
      })
    }

  }, [Username, Router, setValue, msg, setPayments]);

  const handleQuickSelect = (val) => {
    setCustomAmount(val);
    setSelected(val);
  };
  const onSubmit = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const ndata = {
      name: data.name,
      message: data.message,
      amount: customAmount * 50,
      to_user: Username,
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





  return (
    !validUsername ? (
      <div className='w-full h-full flex justify-center items-center'>404 error</div>
    ) : (
      <div className='flex flex-col justify-start items-center min-h-[200vh]  relative bg-gray-200'>
        <div className="absolute top-0 cover w-full h-[20vh] flex justify-center items-center z-0">
          <img className="object-cover bg-center" src={User.coverpic} />
        </div>
        <div className="top-[300px] info absolute z-10 flex justify-center gap-5 flex-wrap ">

          <div className="userInfo w-[600px] h-max flex flex-col justify-start items-center gap-5 p-5 bg-white rounded-2xl shadow-lg">
            <div className="userDetails items-center flex justify-start gap-5 self-start">
              <div className="profilePicture rounded-[50%] w-15 h-15">
                <img className='w-auto h-15 rounded-[50%] object-cover bg-center' src={User.profilepic} alt="" />
              </div>
              <div>{User.name}</div>
            </div>
            <div className="aboutUser w-full flex items-start flex-col ">
              <h4 className='text-[1.2rem] font-bold text-gray-600'>About Me</h4>
              <h4>{User.description}</h4>
            </div>
            <div className="supporters w-full">

              <h4 className='text-[1.2rem] font-bold text-gray-600'>My Supporters</h4>
              <div className="supporterList flex flex-col overflow-y-auto h-[400px] w-full gap-2">
              {Payments.map((payment, index) => (
                <div key={index} className="supporter flex justify-start items-start gap-2 w-full p-2">
                  <div className="profilePicture rounded-[50%] w-10 h-10">
                    <Image
                      className='w-auto h-10 rounded-[50%] object-cover bg-center outline-2 outline-blue-400'
                      src="/user.svg"
                      alt="User profile"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="supporterDetails w-full h-full">
                    <div className="supporterInfo"><span className='font-bold'>{payment.name}</span> bought {payment.amount / 50} chiya.</div>
                    <div className="message bg-gray-100 rounded-md shadow-md p-3" >{payment.message}</div>
                  </div>
                </div>
              ))}

              </div>
            </div>

          </div>
          <div className="payment w-[600px] h-max flex flex-col justify-start items-center gap-5 p-5 bg-white rounded-2xl shadow-lg">
            <h2>Buy {User.name} a chiya</h2>
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
  );


};

export default Username


