import { FileStrutureType } from "@/lib/fieExplorerParser";
import { useState } from "react";

export default function FileExplorer({fileStructureObject,fileClick}:{fileStructureObject:FileStrutureType,fileClick:React.MouseEventHandler<HTMLDivElement>}){
    
    const [open,setOpen]=useState(false)
    
    return(
        <>
        
        <div className="h-full py-1 max-w-60  min-w-10 text-gray-300  ">
            <div 
                onClick={()=>setOpen(prev=>!prev)}
                className=" w-full cursor-default select-none">{
                fileStructureObject.type=="folder"?
                (<div className="font-semibold flex  "><img src="/folderClosed.svg" className="w-5 min-w-5 mx-1" alt="" />  <div className="overflow-hidden">{fileStructureObject.name}</div></div>)
                :(<div onClick={(e)=>fileClick(e)} className="flex "><img src="/file.png" className="h-6  w-5 mx-1" alt="" /><div className="overflow-hidden whitespace-nowrap">{fileStructureObject.name}</div></div>)
            
            }
            
            </div>

            {open && 
            <div className="ml-4">
                {   
                    fileStructureObject.children && 
                    <div>
                        {fileStructureObject.children.map((child)=><FileExplorer fileStructureObject={child} fileClick={fileClick}/>)}
                    </div>
                }
            </div>}
        </div>
            
        </>
    )
}