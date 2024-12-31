export enum StepType{
    CreateFolder="CreateFolder",
    CreateFile="CreateFile",
    EditFile="EditFile",
    DeleteFile="DeleteFile",
    RunScript="RunScript"
}

export interface Step{
    id:number,
    title:string,
    description:string,
    type: StepType
    status: "pending" | "in-progress" | "completed"
    code?:string,
    path?:string
}