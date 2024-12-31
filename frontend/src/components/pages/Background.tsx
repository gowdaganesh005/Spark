

export function Background({children}:{children:React.ReactNode}){
    return(
        <>
        <div className="relative background w-[105%] h-screen ">
            <div className="absolute inset-x-14 -inset-y-40  w-64 bg-gradient-to-b from-sky-400 to-transparent h-64  rounded-full blur-3xl  "></div>
            <div className="absolute inset-x-80 -inset-y-[11rem]  w-80 bg-gradient-to-b from-sky-400 to-transparent h-80  rounded-full blur-3xl "></div>
            <div className=" relative w-[100%] h-full z-10">
            {children}
            </div>
        </div>
        </>
    )
}