import { ReactNode } from "react";

export const DarkButton = ({children, type='purple',onClick, size = "small"}:{children: ReactNode, type:"white"|"purple", onClick:()=>void, size:"big"|"small"}) =>{
    return <div onClick={onClick} className="px-5 py-2 rounded-sm bg-purple_used hover:bg-indigo cursor-pointer text-white font-bold flex gap-3 items-center">
        {children}
    </div>
}