import { Step, StepType } from "@/types";

export interface FileStrutureType{
    type:"folder" | "file",
    name:string
    code?:string
    children?:FileStrutureType[]
}

export default function fileExplorerParser(steps:Step[]){
    let FileStruture:FileStrutureType;
    FileStruture={
        type:"folder",
        name:"Project",
        children:[]
        
    }
    function resolvePath(path:string){
        
        const parts:string[] =path.split('/');
        let current=FileStruture
        if(path=="/"){
            return current
        }
        for(const part of parts){
            if(!current.children){
                current.children=[]

            }
            let next=current.children.find((child)=>child.name==part && child.type=="folder")
            if(!next){
                next={type:"folder",name:part,children:[]}
                current.children.push(next)
            }
            current=next
            
        }
        return current
    }

    for(const step of steps){
        if(step.type===StepType.CreateFolder){
            if(step.path){
                resolvePath(step.path)
            }
            
        }
        else if(step.type===StepType.CreateFile){
            const parts=step.path?.split('/')
            let fileName=parts?.pop()
            const current=resolvePath(parts?.join("/") || "/")
            if(current && !current?.children){
                current.children=[]
            }
            const exists=current?.children?.find(child=>(child.name==fileName && child.type=="file"))
            if(exists){
                exists.code=step.code
            }
            else{
                if(fileName){
                    current?.children?.push({type:"file",code:step.code,name:fileName})
                }
            }
        }
        
    }

    function sortChildren(children:FileStrutureType[]){
        children.sort((a,b)=>{
            if(a.type===b.type){
                return a.name.localeCompare(b.name)
            }else if(a.type=='folder'){
                return -1
            }else{
                return 1
            }
        })
        for(const child of children){
            if(child.children) sortChildren(child.children)
        }
    }

    if(FileStruture.children) sortChildren(FileStruture.children)

    return FileStruture

}