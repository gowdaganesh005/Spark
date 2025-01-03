import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api"

export function useWebContainer(){
    const [webContainer,setWebContainer]=useState<WebContainer>()
    async function init(){
        if(webContainer) return webContainer
        const instance=await WebContainer.boot()
        setWebContainer(instance)
    }
    useEffect(()=>{
        init()
    },[])
    return webContainer
}

