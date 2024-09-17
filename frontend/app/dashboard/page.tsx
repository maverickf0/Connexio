"use client"
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BACKEND_URL } from "../config";
import { ZapTable } from "@/components/basicComponents/ZapTable";
import { useRouter } from "next/navigation";
import { Zap } from "@/components/types";

function useZaps(){
    const[loading, setLoading] = useState(true)
    const [zaps, setZaps] = useState<Zap[]>([])

    useEffect(()=>{
        const response = axios.get(`${BACKEND_URL}/api/v1/zap`,{headers:{
            "authorization":localStorage.getItem("token")
        }}).then(res=>{
            setZaps(res.data.zaps)
            setLoading(false)
        })
    },[])

    return {
        loading,
        zaps
    }
}

export default function (){
    const {loading, zaps} = useZaps();
    const router = useRouter();
    return <div className="flex justify-center">
        {/*TODO: <Searchbar/> */}
        <div className="pt-8 max-w-screen-lg w-[95%]">
            <div className="flex justify-between pr-5">
                <p className="text-3xl font-bold">My Zaps (default folder)</p>
                <DarkButton onClick={()=>{
                    router.push('/zap/create')
                }} type="purple" size="small">
                    <BiPlus size={20}/>
                    <p>Create</p>
                </DarkButton>
            </div>
        {loading?"Loading":<ZapTable zaps={zaps}/>}
        </div>
    </div>
}
