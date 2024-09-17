import React, { ReactElement, ReactNode } from 'react'
import { openDropdownType } from '../types'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const DropButtons = ({type,children,openDropdown,setOpenDropdown}:{type:openDropdownType,children:ReactNode,openDropdown:openDropdownType,setOpenDropdown:React.Dispatch<React.SetStateAction<openDropdownType>>}) => {
  return (
    <div className='relative px-4 py-2 hover:bg-slate-200 flex flex-row gap-2 items-center rounded-sm cursor-pointer group' onClick={()=>{
        if(openDropdown === type){
            setOpenDropdown(null)
        }
        else{
            setOpenDropdown(type)
        }
    }}>
        {children}
        <div className='items-center flex'>
            <FaChevronDown className={`${openDropdown && openDropdown === type ?"rotate-180":""} transition-all duration-500`} size={12}/>
        </div>
        <div className={`${openDropdown === type? ("opacity-100 scale-x-100 origin-left duration-500"):("opacity-0 ")} scale-x-0 absolute left-3 right-3 bottom-0 top-[calc(100%-7px)] bg-black`}></div>
    </div>
  )
}

export default DropButtons