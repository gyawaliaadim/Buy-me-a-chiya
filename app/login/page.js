"use client";
// This is a client componentx 

import React,{useEffect} from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    useEffect(() => {
        if (status === "loading") return; // wait till session loads
    
        if (session) {
            router.push('/dashboard');
        }
    }, [session, status, router]);
    return (
        <div>

            <div className=' w-[75%] h-full flex flex-col justify-start p-10 gap-5 items-center min-h-screen mx-auto'>
                <h1>Welcome</h1>
                <div className="my-20">
                    <button onClick={() => signIn('github')}
                        type="button"
                        className="cursor-pointer w-100 h-15 flex items-center gap-3 bg-white text-black border border-gray-300 px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition">
                        <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1 2.1.7 2.5 1.1.1-.7.4-1.2.8-1.5-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 015.5 8a4.5 4.5 0 01.1-3.2s1-.3 3.3 1.2a11.3 11.3 0 016 0C17.1 4.5 18 4.8 18 4.8a4.5 4.5 0 01.1 3.2 4.7 4.7 0 011.2 3.3c0 4.8-2.9 5.7-5.6 6 .5.4.9 1.1.9 2.3v3.3c0 .4.2.7.8.6A12 12 0 0012 .5z" />
                        </svg>
                        <span className="text-lg font-semibold">Login with GitHub</span>
                    </button>
                </div> 
            </div>

        </div>
    )
}

export default Login