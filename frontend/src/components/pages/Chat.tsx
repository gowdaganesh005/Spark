import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import RenderSteps from "../ui/RenderSteps"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/constants"
import { stepParser } from "@/lib/stepParser"
import { Step } from "@/types"
import { useLocation } from "react-router-dom"
import { fileExplorerParser,  FileParserhelper,  FileStructureType } from "@/lib/fieExplorerParser"
import FileExplorer from "../ui/FileExprorer"

import MonacoEditor from "../ui/MonacoEditor"
import { useWebContainer } from "@/hooks/webContainer"
import { globSync } from "fs"
import CodePreviewTabs from "../ui/CodePreviewTabs"
  

export default function Chat(){
    
    const location =useLocation()

    const { prompt }=location.state as { prompt: string }

    const [steps,setSteps]=useState<Step[]>([])

    //monaco editor values
    const [codeEditor,setCodeEditor]=useState("")
    const [curFile,setcurFile]=useState("")
    const [url,setUrl]=useState<string>()
    const [run,setRun]=useState(false)
    

    const RootFolder:FileStructureType={
      type:"folder",
      name:'Project',
      path:"/",
      children:[]
    }
    const [globalFolderStructure,setGlobalFolderStructure]=useState(RootFolder)

    const fetchtemplate = async (prompt: string) => {
      const res: any = await axios.post(`${BACKEND_URL}/api/template`, { prompt });
      const { prompts, uiPrompts } = res.data;
    
      // Parse initial steps and update
      const initialSteps = stepParser(uiPrompts[0]);
      setSteps(initialSteps.map(step => ({ ...step, status: "completed" })));
    
      setGlobalFolderStructure(prevFolder => 
        fileExplorerParser(prevFolder, initialSteps)
      );
    
      // Prepare LLM request
      const messages = [
        { role: "system", content: prompts },
        { role: "user", content: prompt }
      ];
    
      const llmres = await axios.post(`${BACKEND_URL}/api/chat`, { messages });
      const nextsteps = stepParser(llmres.data.data.content);
    
      // Update steps incrementally
      setSteps(prevSteps => {
        const allsteps = [...prevSteps, ...nextsteps];
        return allsteps.map(step => ({ ...step, status: "completed" }));
      });
    
      // Update folder structure incrementally
      setGlobalFolderStructure(prevFolder => 
        fileExplorerParser(prevFolder, nextsteps)
      );
    };
    

    // id:number,
    // title:string,
    // description:string,
    // type: StepType
    // status: "pending" | "in-progress" | "completed"
    // code?:string,
    // path?:string
    // const fetchresponse=async(prompt:string)=>{
    //   console.log(sysprompts)
    //   const messages=[
    //     {
    //       role:"user",
    //       content:sysprompts
    //     },{
    //       role:"user",
    //       content:prompt
    //     }
    //   ]
    //   const res:any=await axios.post(`${BACKEND_URL}/api/chat`,{messages})
    //   console.log(res.data)
    //   setSteps([...steps].concat(stepParser(res.data.data.content)))
    // }

    const findfile = (
      filestructure: FileStructureType,
      filename: string
  ): FileStructureType | undefined => {
      // console.log("Checking path:", filestructure.path); // Debug log
  
      // Check if the current file matches
      if (filestructure.type === "file" && filestructure.path.split("/").pop() === filename) {
          // console.log("Found file:", filestructure.path); // Debug log
          return filestructure;
      }
  
      // If it's a folder, search its children
      if (filestructure.type === "folder" && filestructure.children) {
          for (const child of filestructure.children) {
              const found = findfile(child, filename); // Recursive call
              if (found) return found; // Return the result immediately
          }
      }
  
      return undefined; // Return undefined if not found
  };
    const fileClick=(e:any)=>{
      // console.log("fileclick ",e)
      // console.log(e.target.innerHTML)
      const file=findfile(globalFolderStructure,e.target.innerHTML)
      setCodeEditor(file?.code || "")
      setcurFile(file?.name || "")
  
    }
   
    useEffect(()=>{
        const firstfetch=async ()=>{
          await fetchtemplate(prompt)
        }
        firstfetch()
        
        
    },[])
    
    const file:any={};
    
  
    const webContainer=useWebContainer()
    // console.log(FileParserhelper(globalFolderStructure,file))
    
    useEffect(()=>{
      const webconFiles=FileParserhelper(globalFolderStructure,file)
      console.log(webconFiles)
      webContainer?.mount(webconFiles)

    },[globalFolderStructure,webContainer])

    async function installDependencies(){
      
      
      const installProcess = await webContainer?.spawn('npm',['install'],{cwd:'Project'});
      // const installProcess2=await webContainer?.spawn('ls')
      

      installProcess?.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));
      // installProcess2?.output.pipeTo(new WritableStream({
      //   write(data) {
      //     console.log(data);
      //   }
      // }));
      const runprocess=await webContainer?.spawn('npm', ['run', 'dev'],{cwd:'Project'});
      runprocess?.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));

        // Wait for `server-ready` event
        
    }

    useEffect(()=>{
      installDependencies()
      setRun(prev=>!prev)
    },[webContainer,globalFolderStructure])

    
    


    

    
    console.log(steps)
    console.log(globalFolderStructure)
    return(
        <>
        
        <div className="w-full  my-10 h-[90%]   border-white   ">
          <div className="w-full h-[95%] flex">
            <div className=" min-w-44 h-full w-80 max-w-96 overflow-scroll  px-2 ">
              <RenderSteps steps={steps}/>
            </div>
            <div className="w-full h-full  flex justify-center  ">
            <ResizablePanelGroup 
            className="bg-gray-600 border md:max-w-screen-lg w-[80%] "
                direction="horizontal">
              <ResizablePanel
                defaultSize={15}
                maxSize={25}
                className="bg-slate-950 min-w-20 max-w-72">
                    
                    <FileExplorer fileStructureObject={globalFolderStructure} fileClick={fileClick}/>

              </ResizablePanel>
              <ResizableHandle  />
              <ResizablePanel
              
              >
                {/* <div className="bg-gray-200"> fileName</div>
                <MonacoEditor key={curFile} value={codeEditor} filename={curFile}/> */}
                <CodePreviewTabs curFile={curFile} codeEditor={codeEditor} webContainer={webContainer}/>
                
                
              </ResizablePanel>
            </ResizablePanelGroup>
            </div>
          </div>

        </div>
        </>
    )
}