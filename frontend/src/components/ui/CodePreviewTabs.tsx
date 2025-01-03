import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MonacoEditor from "./MonacoEditor"
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function CodePreviewTabs({curFile,codeEditor,webContainer}:any){
  const [url,setUrl]=useState<string>()
  const [reload,setReload]=useState(false)
  useEffect(()=>{
    // async function run(){
    //   const runprocess=await webContainer?.spawn('npm', ['run', 'dev'],{cwd:'Project'});
    //   runprocess?.output.pipeTo(new WritableStream({
    //     write(data) {
    //       console.log(data);
    //     }
    //   }));
    // }
    // run()
    
    webContainer?.on('server-ready', (port:any, url:any) => {
      console.log(" url ",url," port ",port)
      setUrl(url)
    });
  },[reload])
    console.log(url)
    return(
        <Tabs defaultValue="account" className=" dark w-full h-screen">
          <TabsList>
            <TabsTrigger value="account">Code</TabsTrigger>
            <TabsTrigger value="password">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="bg-gray-200 "> fileName</div>
            <div className="min-h-full h-screen">
                <MonacoEditor key={curFile} value={codeEditor} filename={curFile}/>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="w-full h-screen">
              <Button onClick={()=>setReload(prev=>!prev)} className="dark ">Reload</Button>
                {url?<iframe className="w-full min-h-full pb-44" src={url} />
                    :<div className="w-full h-full text-center flex flex-col justify-center bg-slate-800 pb-44 font-bold text-xl text-gray-200"> 
                    Preview your code here 
                    </div>

                }
                
            </div>
        </TabsContent>
        </Tabs>

    )
}

