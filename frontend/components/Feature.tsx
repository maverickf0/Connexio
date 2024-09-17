export const Feature = ({title, subTitle}:{title:string, subTitle:string}) =>{
    return <div className="flex gap-1 items-center md:text-lg text-sm">
        <Check/>
        <p className="font-bold pl-1">{title}</p>
        <p>{subTitle}</p>
    </div>
}


function Check (){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 rotate-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
  
}