

export function Background({children}:{children:React.ReactNode}){
    return(
        <>
        <div className="background w-screen h-screen ">
            {children}
        </div>
        </>
    )
}