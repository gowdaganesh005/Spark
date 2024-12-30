import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function LandingPage(){
    const [text,setText]=useState("")
    const [btnVisible,setBtnVisible]=useState(false)
    return(
        <>
        <div className=" w-full h-full flex justify-center items-end   ">
            <div className="max-w-md w-[60%] h-[80%] flex items-center" >
                <div className="rounded-lg h-[20%] min-h-32  border-cyan-900  bg-stone-950 opacity-100 text-slate-400 border-[3px] resize-none w-full  flex ">
                <Textarea 
                    className="border-none resize-none m-1 overflow-hidden"
                    onChange={(e)=>{
                        setText(e.target.value)
                        setBtnVisible(true)
                    }}
                />

                {btnVisible?(<Button variant="default" className="dark mr-2 my-2">{"->"}</Button>):(<></>)}
                
                </div>
            </div>
        </div>
        </>
    )
}