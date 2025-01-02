import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api"

export function useWebContainer(){
    const [webContainer,setWebContainer]=useState<WebContainer>()
    async function init(){
        const webContainer=await WebContainer.boot()
        setWebContainer(webContainer)
    }
    useEffect(()=>{
        init()
    })
    return webContainer
}