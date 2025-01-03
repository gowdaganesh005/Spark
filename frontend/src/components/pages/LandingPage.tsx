import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom"

export function LandingPage(){
    const [prompt,setText]=useState("")
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/create",{state:{prompt}})

    }
    
   
    return(
        <>
        <div className="w-full h-full relative">
            <div className="w-full flex justify-center">
            
            </div>
        <div className=" w-full h-full flex justify-center items-end   ">
            
            <div className=" max-w-md w-[80%] h-[100%] flex items-center" >
                <div className="w-full ">
                <div className="text-gray-100 text-2xl -mx-3 md:-mx-12 md:text-4xl font-extrabold my-4 text-center ">
                    Create Websites using prompt
                </div>
                
                <div className=" textarea-border rounded-lg       opacity-100 text-slate-400  resize-none w-full  flex justify-center">
                    
                <div className="w-[99.5%]   disabled:select-none z-10  min-h-32 h-full bg-neutral-900  rounded-[8px] mx-[0.5px] my-[1px]  flex outline-none ">
                <Textarea 
                    className="border-neutral-900 resize-none ml-1  w-[95%] my-1  bg-neutral-900 outline-none focus-visible:ring-0"
                    onChange={(e)=>{
                        setText(e.target.value)
                     }}
                    placeholder="How can spark help you today"
                />

                {prompt.trim()!=="" && 
                (
                <Button 
                    variant="gradient" 
                    className="dark p-[9px] mr-4 my-4"
                    onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>

                </Button>
                )}
                
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        
        </>
    )
}