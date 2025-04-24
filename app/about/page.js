"use client";
import React from 'react'
import Link from 'next/link'

const About = () => {
    return (
        <div className='bg-[url("/background.svg")] bg-repeat bg-contain w-full fill-white flex justify-center items-center'>
            <div className="  ('my-auto w-[50%] h-full flex flex-col justify-center gap-5 items-center min-h-screen mx-auto">
                <h1>About Us</h1>

                <p className='text-xl text-center mt-4'>This is a simple way for creators to get support from their community. Whether you are making videos, writing blogs, building apps, or just doing your creativity, this platform lets people thank you with a little support (like buying you a chiya, or whatever helps you grind).</p>

                <p className='text-xl text-center mt-2'>No complicated setups. No long explanations. Just a clean space where your followers can show appreciation and keep you going.</p>

                <p className='text-xl text-center mt-2'>Built by creators, for creators.
                    Made with ❤️ and ☕ by </p> <Link className="text-blue-500 underline text-xl text-center mt-2"href="https://linktr.ee/aadimgy">Aadim Gyawali</Link>
                
            </div>
        </div>
    )
}

export default About