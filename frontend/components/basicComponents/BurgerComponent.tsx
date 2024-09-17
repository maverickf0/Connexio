import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

const BurgerComponent = () => {
    const items = ["Product","Solutions","Resources"]
  return (
    <div className='absolute bg-sidebar_bg right-52 pr-2 left-0 top-16 bottom-0 z-30 shadow-2xl shadow-black flex flex-col gap-3'>
        {
            items.map((i,index)=>(
                <div className='border-2 rounded-xl px-3  py-3 text-slate-900 text-sm'>
                    {
                        <div className='flex flex-row justify-between items-center'>
                            <div>{i}</div>
                            <FaChevronDown/>
                        </div>
                    }
                </div>
            ))
        }
    </div>
  )
}

export default BurgerComponent