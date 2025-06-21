"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    
    <>
      <div className="bg-[url('/background.svg')] bg-repeat bg-contain w-full fill-white flex justify-center items-center flex-col gap-3">
        <div className="w-[75%] h-full flex flex-col justify-center gap-10 items-center min-h-screen">
          <h1 >Fund your creative work</h1>
          <p>Accept support. Start a membership. Setup a shop. It’s easier than you think.</p>
          <Link href="/login" className="bg-yellow-400 py-6  px-16 text-black font-bold rounded-full hover:bg-yellow-600 text-2xl">Start my page</Link>
        </div>
        <div className="w-[75%] h-full flex flex-col justify-center gap-5 items-center min-h-screen ">
          <h1 >Give your audience
            an easy way to say thanks.</h1>
          <p>Buy Me a Chiya makes supporting fun and easy. In just a couple of taps, your fans can make the payment (buy you a Chiya) and leave a message.
          </p>
          <Image
            className="object-contain"
            src="/image1.png"
            alt="Demo Image"
            width={750}
            height={750}
          />

        </div>
      </div>
    </>
  );
}
