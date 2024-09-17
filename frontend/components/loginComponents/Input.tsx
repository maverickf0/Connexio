"use client"
import React from 'react'

const Input = ({label, placeholder, onChange, type="text"}:{label:string, placeholder:string, onChange:(e:any)=>void, type?:"text"|"password"}) => {
  return (
    <div>
        <label className='flex flex-col gap-4'>
            <div className='flex flex-row gap-1 items-center font-semibold text-slate-800'>
                <p>*</p>
                <p>{label}</p>
                <p className='text-slate-700 font-normal'>(required)</p>
            </div>
            <input type={type} placeholder={placeholder} onChange={onChange}  className='border rounded px-4 py-2 w-full'/>
        </label>
    </div>
  )
}

export default Input