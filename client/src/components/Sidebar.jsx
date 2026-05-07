import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets.jsx';
import { LayoutGridIcon, MenuIcon, UserIcon, XIcon, CalendarIcon, FileTextIcon, DollarSignIcon, SettingsIcon, ChevronRightIcon, LogOutIcon } from 'lucide-react'

const Sidebar = () => {
    const { pathname} = useLocation()

    const [username, setUsername] = useState("");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        setUsername(dummyProfileData.firstName + " " + dummyProfileData.lastName)
    }, [])

    // Close the mobile menu whenever we change the route 
    useEffect(() => {
        setMobileMenu(false)
    }, [pathname])

    const handleLogout = () => {
        window.location.href = "/login"
    }

    const role = "" || "EMPLOYEE";

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
        role === "ADMIN" ? 
        { name: "Employees", href: "/employees", icon: UserIcon } :
        { name: "Attendance", href: "/attendance", icon: CalendarIcon },
        { name: "Leave", href: "/leave", icon: FileTextIcon },
        { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
        { name: "Settings", href: "/settings", icon: SettingsIcon },
    ]


    const sidebarContent = (
        <>
            {/* Brand Header */}
            <div className='px-5 pt-6 pb-5 border-b border-white/6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <UserIcon className='text-white size-7'/>
                        <div>
                            <p className='font-semibold text-[13px] text-white tracking-wide'>Employee MS</p>
                            <p className='text-[11px] text-slate-500 font-medium'>Management System</p>
                        </div>
                    </div>

                    {/* Close menu on mobile */}
                    <button className='lg:hidden text-slate-400 hover:text-white p-1' onClick={()=> setMobileMenu(false)}>
                        <XIcon size={20}/>
                    </button>

                </div>
            </div>

            {/* User Profile card */}
            {username && (
                <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
                    <div className='flex items-center gap-3 '>
                        <div className='w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
                            <span className='text-slate-400 text-xs font-semibold'>
                                {username.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        <div className='min-w-0'>
                            <p className='text-[13px] font-medium text-slate-200 truncate'>{username}</p>
                            <p className='truncate text-[11px] text-slate-500'>{role === "ADMIN" ? "Administator" : "Employee"}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Section label */}
            <div className='px-5 pt-5 pb-2'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'> Navigation</p>
            </div>

            {/* Navigation list */}
            <div className='flex-1 px-3 space-y-0.5 overflow-y-auto'>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link 
                            key={item.name} 
                            to={item.href} 
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${isActive ? "bg-orange-500/12 text-orange-300" : "text-slate-300 hover:text-white hover:bg-white/4"}`}
                        >
                            {isActive && <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-orange-500'/>}
                            <item.icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? "text-orange-300" : "text-slate-400 group-hover:text-slate-300"}`} />
                            <span className='flex-1'>{item.name}</span>
                            {isActive && <ChevronRightIcon className='w-3.5 h-3.5 text-orange-500/50' />}
                        </Link>
                    )
                })}
            </div>

            {/* Logout */}
            <div className='p-3 border-t border-white/6'>
                <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150'>
                    <LogOutIcon className='w-[17px] h-[17px]' />
                    <span>Log Out</span>
                </button>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile hamburger button */}
            <button onClick={()=> setMobileMenu(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10'>
                <MenuIcon size={20} />
            </button>

            {/* Mobile Overlay */}
            {mobileMenu && <div className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40' onClick={()=> setMobileMenu(false)} /> }

            {/* Sidebar Desktop */}
            <aside className='hidden lg:flex flex-col h-full w-[260px] bg-gradient-to-b from-orange-900 via-orange-900 to-orange-950 text-white shrink-0 border-r border-white/4'>
                {sidebarContent}
            </aside>

            {/* Sidebar - Mobile */}
            <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-orange-900 via-orange-900 to-orange-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
                {sidebarContent}
            </aside>
        </>
    )
}

export default Sidebar