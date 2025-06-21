"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import ProfileImage from './ProfileImage';
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();
    const [profilePic, setprofilePic] = useState("")
    const [username, setUsername] = useState("")
    const [profileName, setName] = useState("")
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return; // chill until status is resolved

        if (session) {
            const fetchData = async () => {

                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");


                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };
                    const r = await fetch(`/api/fetchUser?username=null&email=${encodeURIComponent(session.user.email)}`, requestOptions);
                    const userInfo = await r.json();
                    // setGetUserInfo(userInfo.user);
                    if (userInfo.user) {
                        setName(userInfo.user.name);
                        setprofilePic(userInfo.user.profilepic);
                        setUsername(userInfo.user.username);
                    }
                    else {
                        setName(session.user.name);
                        setprofilePic("profilepic", session.user.image);

                    }

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            fetchData();
        }


    }, [session, status]);


    return (
        <nav className="bg-white text-black border-gray-200 sticky top-0 z-50 shadow-md py-1">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" className="object-fit" height={80} width={120} alt="Buy me a Chiya Logo" />
                </Link>

                {session ? (
                    <div

                        className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"

                    // so this div can receive focus/blur
                    >
                        <button
                            type="button"
                            onBlur={(e) => {
                                setTimeout(() => {

                                    setDropdownOpen(false);

                                }, 200);
                            }}

                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 cursor-pointer"
                            aria-expanded={dropdownOpen}
                        >
                            {profilePic &&
                                // <div className="profilePicture rounded-full w-10 h-10 overflow-hidden">
                                //     <img className='w-10 h-auto object-cover' src={profilePic} alt="" />
                                // </div>}
                                <ProfileImage src={profilePic} length={10} />
                            }
                        </button>

                        {dropdownOpen && (
                            <div
                                // onClick={() => setDropdownOpen(true)}

                                className="absolute right-0 top-12 z-50 text-base list-none bg-white text-black divide-y divide-gray-100 rounded-lg shadow">
                                <div



                                    className="px-4 py-3 w-full h-full">
                                    <span className="block text-sm">{profileName}</span>
                                    <span className="block text-sm text-gray-500 truncate">{session.user.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/${username}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Page
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => signOut()}
                                            type="button"
                                            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link
                            href="/login"
                            className="bg-yellow-400 py-3 px-6 text-black font-bold rounded-full hover:bg-yellow-600 text-xl"
                        >
                            Login
                        </Link>
                    </div>
                )}

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link
                                href="/"
                                className={`block py-2 px-3 rounded-sm md:p-0 md:bg-transparent ${pathname === "/" ? "text-blue-700" : "text-black"
                                    }`}
                                aria-current={pathname === "/" ? "page" : undefined}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${pathname === "/about" ? "text-blue-700" : "text-black"
                                    }`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/demo"
                                className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${pathname === "/demo" ? "text-blue-700" : "text-black"
                                    }`}
                            >
                                Demo
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};


export default Navbar;
