import { ReactNode } from "react";

export const LinkButton = ({children, onclick}:{children:ReactNode, onclick:()=>void}) =>{
    return <div className="px-4 py-2 cursor-pointer text-md hover:bg-white " onClick={onclick}>
        {children}
    </div>
}