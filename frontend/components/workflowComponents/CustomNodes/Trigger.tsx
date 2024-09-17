import { Handle, NodeProps, Position } from '@xyflow/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiLightningBolt } from "react-icons/hi";

export const Trigger = ({id, name, index}:NodeProps & {name:string, index:number}) => {
  return (
    <div className='border-2 border-dotted p-4 border-gray-600 rounded-md flex flex-col gap-2 shadow-lg w-96'>
        <div className='flex flex-row justify-between'>
          {
            name?(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>{name}</p>
              </button>
            ):(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>Trigger</p>
              </button>              
            )
          }<div className='p-1 rounded-md hover:bg-gr
          
          ay-200'>
            <BsThreeDotsVertical/>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <p className='font-bold'>{id}.</p>
          <input type="text" placeholder='Select the event for your Zap to run' className='outline-none px-3 w-full' />
        </div>
        <Handle type='source' position={Position.Bottom} className='opacity-0 hover:opacity-100'/>
        <Handle type='target' position={Position.Top} className='opacity-0 hover:opacity-100'/>
    </div>
  )
}

export const Action = ({id, name, index}:NodeProps & {name:string, index:number}) => {
  return (
    <div className='border-2 border-dotted p-4 border-gray-600 rounded-md flex flex-col gap-2 shadow-lg w-96'>
        <div className='flex flex-row justify-between'>
          {
            name?(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>{name}</p>
              </button>
            ):(
              <button className='bg-gray-400 bg-opacity-20 font-bold border border-black rounded-sm p-1 text-sm flex flex-row gap-2 items-center'>
                <HiLightningBolt/>
                <p>Trigger</p>
              </button>              
            )
          }<div className='p-1 rounded-md hover:bg-gr
          
          ay-200'>
            <BsThreeDotsVertical/>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <p className='font-bold'>{id}.</p>
          <input type="text" placeholder='Select the event for your Zap to run' className='outline-none px-3 w-full' />
        </div>
        <Handle type='source' position={Position.Bottom} className='opacity-0 hover:opacity-100'/>
        <Handle type='target' position={Position.Top} className='opacity-0 hover:opacity-100'/>
    </div>
  )
}

