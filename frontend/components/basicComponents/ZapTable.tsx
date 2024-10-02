"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { MailCheckIcon } from "lucide-react"
import { FaChevronRight } from "react-icons/fa"
import RenderIcons from "./RenderIcons"
import { useRouter } from "next/navigation"
import { Zap } from "../types"
import { HOOK_URL } from "@/app/config"

export function ZapTable({zaps}:{zaps:Zap[]}){
    const router = useRouter();
    return <div className="mt-10">
                <Table>
                    <TableCaption>A list of your recent Zaps.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>
                            <div>
                                <input type="checkbox" name="zaps-check" id="" className="size-5" />
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[max-content] text-center">Name</TableHead>
                        <TableHead className="w-[30%] text-center">Id</TableHead>
                        <TableHead className="text-center">Created At</TableHead>
                        <TableHead className="text-center">Webhook</TableHead>
                        <TableHead className="text-center">Running</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            zaps.map((zap,index)=>(
                                <TableRow>
                                    <TableCell>
                                        <div className="flex flex-row gap-3 items-center">
                                            <div>
                                                <input type="checkbox" name="zap-checkbox" id="" className="size-5" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                            <div className="flex flex-row items-center justify-center">{
                                                <div className="flex flex-row gap-2 items-center">
                                                    <RenderIcons text={zap.trigger.type.image}/>
                                                    <div className="flex flex-row gap-2">
                                                        {
                                                            zap.actions.map(x=><RenderIcons text={x.type.image} />)
                                                        }
                                                    </div>
                                                </div>
                                                }</div>
                                        
                                    </TableCell>
                                    <TableCell className="w-[100px] text-center">
                                        {zap.id}
                                    </TableCell>
                                    <TableCell className="text-center">Dates::</TableCell>
                                    <TableCell className="relative hover:bg-gray-200 transition-all duration-200 cursor-pointer group active:bg-green-400 active:text-white" onClick={()=>{
                                        navigator.clipboard.writeText(`${HOOK_URL}/hooks/catch/${zap.userId}/${zap.id}`)
                                    }}>
                                        <p>{`${HOOK_URL}/hooks/catch/${zap.userId}/${zap.id}`}</p>
                                        <div className="opacity-0 group-active:opacity-80 bg-gray-500 h-9 p-2 z-30 absolute -right-16 top-1/2 -translate-y-1/2">!copied</div>    
                                    </TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        <div className="flex flex-row gap-4" onClick={()=>router.push('/zap/'+ zap.id)}>
                                            <p className="text-center">Go</p>
                                            <FaChevronRight/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
    </div>
}