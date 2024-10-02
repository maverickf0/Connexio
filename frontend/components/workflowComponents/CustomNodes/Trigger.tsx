import { Handle, NodeProps, Position } from '@xyflow/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiLightningBolt } from "react-icons/hi";

export const Trigger = (props: NodeProps &  {name:string, index:number, onClick:(props:any)=>void}) => {
  const {id, onClick, name = "Trigger", index, data} = props;
  return (
    <div className='border-2 border-dotted p-4 border-gray-600 bg-white rounded-md flex flex-col gap-2 shadow-lg w-96' onClick={onClick}>
        <div className='flex flex-row justify-between'>
          {
            props.data.name?(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>{props.data.name as string}</p>
              </button>
            ):(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>Trigger</p>
              </button>              
            )
          }
        </div>
        <div className='flex flex-row gap-2'>
        {/* @ts-ignore */}
          <p className='font-bold'>{index}</p>
          <input type="text" placeholder='Select the event for your Zap to run' className='outline-none px-3 w-full' />
        </div>
        <Handle type='source' position={Position.Bottom} className='opacity-0 hover:opacity-100'/>
        <Handle type='target' position={Position.Top} className='opacity-0 hover:opacity-100'/>
    </div>
  )
}

export const Action = (props: NodeProps &  {name:string, index:number, onClick:(props:any)=>void}) => {
  const {id, onClick, name = "Action", index, data} = props;
  return (
    <div className='border-2 border-dotted p-4 border-gray-600 bg-white rounded-md flex flex-col gap-2 shadow-lg w-96' onClick={onClick}>
        <div className='flex flex-row justify-between'>
          {
            props.data.name?(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>{props.data.name as string}</p>
              </button>
            ):(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>Action</p>
              </button>              
            )
          }
        </div>
        <div className='flex flex-row gap-2'>
          {/* @ts-ignore */}
          <p className='font-bold'>{data.index}.</p>
          <input type="text" placeholder='Select the event for your Zap to run' disabled className='cursor-pointer outline-none px-3 w-full' />
        </div>
        <Handle type='source' position={Position.Bottom} className='opacity-0 hover:opacity-100'/>
        <Handle type='target' position={Position.Top} className='opacity-0 hover:opacity-100'/>
    </div>
  )
}

