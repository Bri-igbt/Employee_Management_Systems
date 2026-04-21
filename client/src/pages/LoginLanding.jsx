import { Link } from "react-router-dom"
import LoginLeftSide from "../components/LoginLeftSide.jsx"
import { UserIcon, ShieldIcon, ArrowRightIcon } from 'lucide-react'

const LoginLanding = () => {

    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            desc: "Manage employees, departments, payroll and system configurations.",
            icon: ShieldIcon
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            desc: "View your profile, track attendance, request time off and access payslips.",
            icon: UserIcon
        },

    ]

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <LoginLeftSide />

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
                <div className="w-full max-w-md animate-fade-in relative z-10">
                    {/* Header */}
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome Back</h2>
                        <p className="text-slate-500">Select your portal to securely access the system.</p>
                    </div>
                    {/* Portal List */}
                    <div className="space-y-4">
                        {portalOptions.map((folder) => (
                            <Link 
                                key={folder.to} 
                                to={folder.to} 
                                className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-orange-400 hover:bg-orange-50"
                            >
                                <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5" >
                                    <h3 className="text-lg text-slate-800 group-hover:text-orange-600 mb-1 transition-colors">{folder.title}</h3>
                                    <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300"/>
                                </div>

                            </Link>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center md:text-left text-sm text-slate-400">
                        <p>© {new Date().getFullYear()} StackQuest. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginLanding
