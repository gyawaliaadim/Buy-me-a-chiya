"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
const Dashboard = () => {
    const [GetUserInfo, setGetUserInfo] = useState({});

    const { data: session, status } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

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
            
                    const currentUrl = typeof window !== "undefined" ? window.location.origin : '';
                    const r = await fetch(`${currentUrl}/api/fetchUser?username=null&email=${encodeURIComponent(session.user.email)}`, requestOptions);
                    const userInfo = await r.json();
                    // console.log(userInfo)
                    setGetUserInfo(userInfo.user);
                    if (userInfo.user) {
                        setValue("name", userInfo.user.name);
                        setValue("username", userInfo.user.username);
                        setValue("profilepic", userInfo.user.profilepic);
                        setValue("coverpic", userInfo.user.coverpic);
                        setValue("description", userInfo.user.description);
                    }
                    else{
                        setValue("name", session.user.name);
                        setValue("profilepic", session.user.image);
                        
                    }
                    setValue("email", session.user.email);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            fetchData();
        }
        else{
            router.push('/login');
        }


    }, [session, status, router, setValue]);

    const onSubmit = async (data) => {
        if (!GetUserInfo){
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
        
                
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };
        
                const currentUrl = typeof window !== "undefined" ? window.location.origin : '';
                const r = await fetch(`${currentUrl}/api/fetchUser?username=${encodeURIComponent(data.username)}&email=null`, requestOptions);
                const userInfo = await r.json();
                if (userInfo.user) {
                    setError("username", {
                        type: "manual",
                        message: "Username already exists",

                    });
                    return;
                }
                
            }
            catch (error) {
                console.log(error)
            }
        }
        try {
            new URL(data.profilepic);
        } catch {
            setError("profilepic", {
                type: "manual",
                message: "Invalid URL for profile picture",
            });
            return;
        }

        try {
            new URL(data.coverpic);
        } catch {
            setError("coverpic", {
                type: "manual",
                message: "Invalid URL for cover picture",
            });
            return;
        }

        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };
                    
        const currentUrl = typeof window !== "undefined" ? window.location.origin : '';
        const r = await fetch(`${currentUrl}/api/updateProfile`, requestOptions);
        const result = await r.json()

 
        if (result.success) {
            alert(result.message);
            window.location.reload()
        } 
        
        else if(!result.success){
            alert(result.message);
        }
        else{
            alert("Something went wrong. Please try again later.")
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" p-10 w-full max-w-md shadow-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome to your dashboard</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-2 rounded bg-gray-200"
                        type="text"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Username */}
                {!GetUserInfo && (
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters",
                            },
                            validate: (val) =>
                                !/\s/.test(val) || "Username should not contain spaces",
                        })}
                        className="w-full p-2 rounded bg-gray-200"
                        type="text"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>) }

                {/* Profile Picture */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Profile Picture URL</label>
                    <input
                        {...register("profilepic", { required: "Profile picture URL is required" })}
                        className="w-full p-2 rounded bg-gray-200"
                        type="text"
                    />
                    {errors.profilepic && (
                        <p className="text-red-500 text-sm">{errors.profilepic.message}</p>
                    )}
                </div>

                {/* Cover Picture */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Cover Picture URL</label>
                    <input
                        {...register("coverpic", { required: "Cover picture URL is required" })}
                        className="w-full p-2 rounded bg-gray-200"
                        type="text"
                    />
                    {errors.coverpic && (
                        <p className="text-red-500 text-sm">{errors.coverpic.message}</p>
                    )}
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">About your self</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full p-2 rounded bg-gray-200"
                        placeholder={`Hi, I'm ${watch("name") || ""} ...`}
                        rows={5}
                        cols={40}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 px-4 rounded font-bold cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
