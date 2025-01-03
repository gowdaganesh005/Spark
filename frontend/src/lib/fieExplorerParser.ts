import { Step, StepType } from "@/types";

export interface FileStructureType{
    type:"folder" | "file",
    name:string
    code?:string
    children?:FileStructureType[]
    path:string
}

// interface fileParserProps{
//     FileStructure:FileStructureType,
//     steps:Step[]
// }

export  function fileExplorerParser(FileStructure:FileStructureType,steps:Step[]){
    let FileStruture:FileStructureType;
    FileStruture=FileStructure
    function resolvePath(path:string){
        
        const parts:string[] =path.split('/');
        let current=FileStruture
        if(path==="/"){
            return current
        }
        for(const part of parts){
            if(!current.children){
                current.children=[]

            }
            let next=current.children.find((child)=>child.name==part && child.type=="folder")
            if(!next){
                next={type:"folder",name:part,path:path,children:[]}
                current.children.push(next)
            }
            current=next
            
        }
        return current
    }

    for(const step of steps){
        if(step.status=="pending"){
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
                if(exists.code !== step.code){
                    console.log("file exxists",exists.name)
                    exists.code=step.code
                }
                
            }
            else{
                if(fileName){
                    current?.children?.push({type:"file",code:step.code,path:step.path || "",name:fileName})
                }
            }
        }
        step.status = "completed";
    } 
        
    }

    function sortChildren(children:FileStructureType[]){
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



export function FileParserhelper(folderStructure:FileStructureType,file:any){
    if(folderStructure.type=='file'){
        const filename=folderStructure.name
        const contents=folderStructure.code
        const obj={
            [`${filename}`]:{
                file:{
                    contents:`${contents}`

                }
            }
        }
        console.log(obj)
        file={...file,...obj}
    }else if(folderStructure.type=='folder'){
        const foldername=folderStructure.name
        let children:any={};
        if(folderStructure.children){
            for(const child of folderStructure.children){
                children={...children,...FileParserhelper(child,{})}
            }
        }

        
        const obj={
            [foldername]:{
                directory:children
            }
        }
        file={...file,...obj}
    }
    console.log(file)
    return file
}