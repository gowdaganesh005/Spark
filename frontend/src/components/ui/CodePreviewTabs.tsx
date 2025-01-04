import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MonacoEditor from "./MonacoEditor"
import { useEffect, useState } from "react";
import { Button } from "./button";
import IframePreview from "./IframePreview";
import { WebContainer } from "@webcontainer/api";

export default function CodePreviewTabs({curFile,codeEditor,globalFolderStructure,webContainer}:any){
  
  const [reload,setReload]=useState(false)
  
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
            <IframePreview globalFolderStructure={globalFolderStructure} webContainer={webContainer} />
          </TabsContent>
        </Tabs>

    )
}

