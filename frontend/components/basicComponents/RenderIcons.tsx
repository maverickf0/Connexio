import React from 'react'
import { MdAttachEmail, MdWebhook } from 'react-icons/md'
import { SiRazorpay, SiSolana } from 'react-icons/si'

const RenderIcons = ({text}:{text:string}) => {
  
    return <div className='p-1 border-[2px] border-[#eeeee8] size-9 rounded-full'>
        <img src={text} className="aspect-square object-cover" />
    </div>
  
}

export default RenderIcons