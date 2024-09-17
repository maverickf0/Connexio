import { ReactNode } from "react";

export const PrimaryButton = ({children, type='orange',onClick, size = "small"}:{children: ReactNode, type:"white"|"orange", onClick:()=>void, size?:"big"|"small"}) =>{
    return <div onClick={onClick} className={`${size == "small"?"text-xs md:text-lg md:px-6 px-2 py-2":"sm:text-xl text-lg sm:px-20 px-10 py-4"} ${type == "orange"?('bg-orange text-white'):('bg-white border-black border-2 text-black')} items-center justify-center hover:drop-shadow-xl cursor-pointer font-bold flex gap-3 rounded-full`}>
        {children}
    </div>
}