"use client"

import React from 'react'
import { PrimaryButton } from './buttons/PrimaryButton'
import { GrGoogle } from 'react-icons/gr'
import { Feature } from './Feature'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter();
  return (
    <div className='mx-auto w-screen'>
      <div className='md:text-7xl xs:text-5xl text-3xl font-HeroHeading text-center sm:font-bold font-semibold sm:pt-32 pt-10 sm:mb-5 mb-3 max-w-[1260px] mx-auto sm:px-20 px-4'>
        Automate as fast as you can type
      </div>
      <div className='flex flex-col gap-10 justify-center items-center sm:w-3/5 w-[90%] mx-auto'>
        <p className='sm:text-3xl text-lg font-HeroHeading text-center'>AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.</p>
        <div className='flex sm:flex-row flex-col sm:gap-10 gap-3 text-2xl'>
          <PrimaryButton type='orange' size='big' onClick={()=>{router.push('/signup')}}>Start free with email</PrimaryButton>
          <PrimaryButton type = 'white' size='big' onClick={()=>{}}>
            <GrGoogle/>
            <p className='text-slate-700'> Start free with google</p>
          </PrimaryButton>
        </div>
        <div className='flex flex-col sm:flex-row justify-center gap-3 items-center'>
          <Feature title='Free forever' subTitle='Free forever'/>
          <Feature title='More apps' subTitle='than any other platform'/>
          <Feature title='Cutting-edge' subTitle='AI features'/>
        </div>
      </div>
    </div>
  )
}

export default Hero