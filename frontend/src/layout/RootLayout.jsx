import { Outlet } from "react-router-dom"
const RootLayout = () => {
    return (
        <div className='min-h-screen bg-zinc-950 flex items-center justify-center
        relative overflow-hidden'>
            <Outlet />
        </div>
    )
}

export default RootLayout
