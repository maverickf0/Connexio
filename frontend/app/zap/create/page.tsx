"use client"
import { LinkButton } from "@/components/buttons/LinkButton";
import ZapCanvas from "@/components/ZapCanvas";
import ZapCell from "@/components/ZapCell";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import Input from "@/components/loginComponents/Input";
  

function useAvailableActionsAndTriggers () {
    const [availableActions,setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
        .then(x =>{ setAvailableTriggers(x.data.availableTrigger)})

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
        .then(x => setAvailableActions(x.data.availableActions))
    },[])

    return {
        availableActions,
        availableTriggers
    }
}

export default function (){

    const {availableActions, availableTriggers} = useAvailableActionsAndTriggers();

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id:string;
        name:string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index:number,
        availableActionId: string,
        availableActionName:string,
        metadata:any;
    }[]>([]);

    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    const router = useRouter();

    return <div>
            <div className="flex justify-end">
                <PrimaryButton type="orange" onClick={async()=>{
                    if(!selectedTrigger?.id){
                        return;
                    }
                    const response = await axios.post(`${BACKEND_URL}/api/v1/zap`,{
                        "availableTriggerId": selectedTrigger?.id,
                        "triggerMetadata":{},
                        "actions": selectedActions.map((action)=>({
                            availableActionId: action.availableActionId,
                            actionMetadata: action.metadata
                        }))
                    },{
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })

                    router.push("/dashboard")
                }}>
                    Publish
                </PrimaryButton>
            </div>
            <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
            {/* <ZapCanvas name="trigger" index={1}/> */}
            <div className="flex justify-center w-full">
                <ZapCell onClick={()=>{
                    setSelectedModalIndex(1);
                     }} name= {selectedTrigger? selectedTrigger.name: "Trigger"} index= {1}/>
            </div>
            <div className="flex justify-center w-full pt-2 pb-2 flex-col items-center">
                {
                    selectedActions?.map((action, index) =><div className="pt-2" key={action.index} onClick={()=>setSelectedModalIndex(action.index)}>
                        <ZapCell onClick={()=>{
                            setSelectedModalIndex(action.index);
                            }} name= {action.availableActionName? action.availableActionName: "Action"} index= {action.index}/>
                        </div>)
                }
            </div>
            <LinkButton onclick={()=>{
                setSelectedActions(a=>[...a, {
                    index: a.length+2,
                    availableActionId:"",
                    availableActionName:"",
                    metadata: {}
                }])
            }}>
                <div className="text-2xl">
                    +
                </div>
            </LinkButton>
        </div>
        {selectedModalIndex && <Modal availableItems  = {selectedModalIndex == 1? availableTriggers: availableActions} index={selectedModalIndex} onSelect = {(props:null | {name:string, id:string, metadata:any})=>{
            if(props == null){
                setSelectedModalIndex(null);
                return;
            }
            if(selectedModalIndex === 1){
                setSelectedTrigger({
                    id:props.id,
                    name:props.name,
                })
                setSelectedModalIndex(null)
            }
            else{
                setSelectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModalIndex - 2] = {
                        index: selectedModalIndex,
                        availableActionId: props.id,
                        availableActionName:props.name,
                        metadata: props.metadata
                    }
                    setSelectedModalIndex(null)
                    return newActions
                })
            }
        }}/>}
    </div>
}


function Modal({index, onSelect, availableItems}:{index:number, onSelect:(props:null | {name:string, id:string, metadata:any;})=>void, availableItems: {
    id:string;
    name:string;
    image:string;
}[]}){

    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id:string,
        name: string
    }>();

    const isTrigger = index === 1;


    return <div>
        <Dialog open={true} onOpenChange={()=>onSelect(null)}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select { index == 1? "Trigger" : "Action" }</DialogTitle>
                    </DialogHeader>
                        <DialogDescription>
                            {
                                step === 1 && selectedAction?.id === "email" && <EmailSelector setMetadata={(metadata)=>{
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    })
                                }}/>
                            }
                            {
                                step === 1 && selectedAction?.id === "sol" && <SolanaSelector setMetadata={(metadata)=>{
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    })
                                }}/>
                            }
                            {
                                step === 0 && <div>
                                {
                                    availableItems?.map(({id, name, image})=>(
                                        <div onClick={()=> {
                                            if(isTrigger){
                                                onSelect({
                                                    id: id,
                                                    name:name,
                                                    metadata:{}
                                                })
                                            }
                                            else{
                                                setStep(s => s+1);
                                                setSelectedAction({
                                                    id,
                                                    name
                                                })
                                            }
                                        }} className="flex border gap-3 items-center p-4 cursor-pointer hover:bg-gray-300" key={id}>
                                            <img src={image} alt="" width={30}  className="rounded-full"/>
                                            <div className="text-xl text-gray-800 rounded-full">{name}</div>
                                        </div>
                                    ))}
                                    </div>
                            }
                        </DialogDescription>
            </DialogContent>
        </Dialog>
    </div>
}


function EmailSelector ({setMetadata}:{
    setMetadata:(params:any) =>void
}) {
    const [email, setEmail] = useState("")
    const [body, setBody] = useState("")
    return <div>
        <Input label = {"To"} type = {"text"} placeholder = {"To"} onChange={(e)=> setEmail(e.target.value)}></Input>
        <Input label = {"Body"} type = {"text"} placeholder = {"Body"} onChange={(e)=> setBody(e.target.value)}></Input>
        <PrimaryButton type="orange" onClick={()=> {
            setMetadata({
                email,
                body
            })
        }}>Submit</PrimaryButton>
    </div>
}

function SolanaSelector({setMetadata}:{
    setMetadata:(params:any) =>void
}){
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    return <div>
        <Input label="Address" type = "text"  placeholder="Address" onChange={(e)=> setAddress(e.target.value)}></Input>
        <Input label="Amount" type = "text"  placeholder="Amount" onChange={(e)=> setAmount(e.target.value)}></Input>
        <PrimaryButton type="orange" onClick={()=> {
            setMetadata({
                amount,
                address
            })
        }}>Submit</PrimaryButton>
    </div>
}