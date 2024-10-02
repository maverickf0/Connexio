"use client"
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import CheckFeature from "@/components/loginComponents/CheckFeature";
import Input from "@/components/loginComponents/Input";
import { CgGoogle } from "react-icons/cg";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function (){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()

    const router = useRouter()

    return <div className="flex flex-row gap-44  max-w-6xl mx-auto justify-between items-center p-7 mt-8">
        <div className="flex flex-col flex-1 gap-9">
            <div className="font-HeroHeading text-4xl text-slate-800 leading-normal font-semibold ">
                Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="flex gap-7 flex-col text-lg">
                <CheckFeature label="Easy setup, no coding required"/>
                <CheckFeature label="Free forever for core features"/>
                <CheckFeature label="14-day trial of premium features & apps"/>
            </div>
        </div>
        <div className="flex-1">
            <div className="border-[1px] flex flex-col gap-3 rounded-sm p-4 ">
                <button className="relative flex flex-row gap-4 items-center justify-center bg-blue-500 px-4 py-2  rounded-md">
                    <div className="absolute left-4 bg-white rounded-md p-1">
                        <CgGoogle size={20}/>
                    </div>
                    <div className="text-white font-bold text-lg ">
                        Sign up with Google
                    </div>
                </button>
                <div className="flex gap-3 justify-evenly items-center">
                    <div className="border-[1px] border-slate-200 h-[1px] w-full"></div>
                    <p>OR</p>
                    <div className="border-[1px] border-slate-200 h-[1px] w-full"></div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2">
                        <Input label={"Email"} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} type = "text" placeholder ="Your Email"/>
                        <Input label={"Password"} onChange={(e)=>{
                            setPassword(e.target.value)
                        }} type = "password" placeholder ="Password"/>
                    </div>
                    <PrimaryButton size="big" type="orange" onClick={async()=>{
                        try{

                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                                username:email,
                                password:password
                            })

                            localStorage.setItem("token",res.data.token)
                            router.push('/dashboard')
                        }
                        catch(e){
                            console.log(e);
                        }
                    }}>Get started free</PrimaryButton>
                    <p>By signing up, you agree to Zapier's <a href="#" className="underline">terms of service</a> and <a href="#" className="underline">privacy policy</a>.</p>
                </div>
            </div>

        </div>
    </div>
}