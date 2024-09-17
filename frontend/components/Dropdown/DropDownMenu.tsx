

import React from 'react'
import { openDropdownType } from '../types'

const DropDownMenu = ({open}:{open:openDropdownType}) => {
  return (
    <div className=' left-0 right-0 h-32 bg-black w-full -top-16 z-40 text-white'>
        {open}
    </div>
  )
}

export default DropDownMenu