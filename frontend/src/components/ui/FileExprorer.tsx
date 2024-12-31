import { FileStrutureType } from "@/lib/fieExplorerParser";
import { useState } from "react";

export default function FileExplorer({fileStructureObject}:{fileStructureObject:FileStrutureType}){
    const [open,setOpen]=useState(false)
    
    return(
        <>
        
        <div className="h-full py-1 max-w-60 bg-gray-900 min-w-10 text-gray-300 ">
            <div 
                onClick={()=>setOpen(prev=>!prev)}
                className=" w-full cursor-default select-none ">{
                fileStructureObject.type=="folder"?
                (<div className="font-semibold flex"><img src="/folderClosed.svg" className="w-5 mx-1" alt="" /> {fileStructureObject.name}</div>)
                :(<div className="flex"><img src="/file.png" className="w-5 mx-1" alt="" />{fileStructureObject.name}</div>)
            
            }
            
            </div>

            {open && 
            <div className="ml-4">
                {   
                    fileStructureObject.children && 
                    <div>
                        {fileStructureObject.children.map((child)=><FileExplorer fileStructureObject={child}/>)}
                    </div>
                }
            </div>}
        </div>
            
        </>
    )
}