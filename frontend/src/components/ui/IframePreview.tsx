import { useEffect, useState } from "react"
import { Button } from "./button"
import { WebContainer } from "@webcontainer/api";
import { FileParserhelper, FileStructureType } from "@/lib/fieExplorerParser";

export default function IframePreview({globalFolderStructure,webContainer}:{globalFolderStructure:FileStructureType,webContainer:WebContainer}){
    const [reload,setReload]=useState(false)
    const [run,setRun]=useState(false)
    const [url,setUrl]=useState<string>()

    const file:any={};
    useEffect(()=>{
      const webconFiles=FileParserhelper(globalFolderStructure,file)
      console.log(webconFiles)
      webContainer?.mount(webconFiles)

    },[])

    

    async function runContainer(){
      const Process = await webContainer?.spawn('npm',["install"],{cwd:"Project"})        
        Process?.output.pipeTo(new WritableStream({
          write(data) {
            console.log(data);
          }
        }));
        const installProcess = await webContainer?.spawn('node',['check-dependencies.js'],{cwd:'Project'})        
        installProcess?.output.pipeTo(new WritableStream({
          write(data) {
            console.log(data);
          }
        }));
        
        const runprocess=await webContainer?.spawn('npm', ['run', 'dev'],{cwd:'Project'});
        runprocess?.output.pipeTo(new WritableStream({
            write(data) {
          console.log(data);
            }
        }));
        


    }
    async function rerun(){
      const installProcess = await webContainer?.spawn('node',['check-dependencies.js'],{cwd:'Project'})        
        installProcess?.output.pipeTo(new WritableStream({
          write(data) {
            console.log(data);
          }
        }));
      
      const runprocess=await webContainer?.spawn('npm', ['run', 'dev'],{cwd:'Project'});
        runprocess?.output.pipeTo(new WritableStream({
            write(data) {
          console.log(data);
            }
        }));
        webContainer.on('server-ready',(port,url)=>{
          setUrl(url)
          console.log(port)
          console.log(url)
      })
    }
    useEffect(()=>{
        runContainer()
        webContainer.on('server-ready',(port,url)=>{
            setUrl(url)
            console.log(port)
        })
    },[])
    useEffect(()=>{
      
      rerun()
    },[run])
     return(
        <>
        <div className="w-full h-screen">
          <Button onClick={()=>setReload(prev=>!prev)} className="dark ">Reload</Button>
          <Button onClick={()=>setRun(prev=>!prev)} className="dark ">Rerun</Button>
            {url?<iframe className="w-full min-h-full pb-44" src={url} />
                :<div className="w-full h-full text-center flex flex-col justify-center bg-slate-800 pb-44 font-bold text-xl text-gray-200"> 
                Preview your code here 
                </div>
            }
        </div>
        </>
     );
}