import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets.jsx';

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const isEditMode = !!initialData;

    const handleSubmit = async (e) => {
        e.preventDefault()
    }


    return (
        <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>

            {/* personal info */}
            <div className="card p-5 sm:p-6">
                <h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>
                    Personal Infomation
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                    <div>
                        <label className='block mb-2'>FirstName</label>
                        <input 
                            name="firstName" 
                            required 
                            defaultValue={initialData?.firstName} 
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>lastName</label>
                        <input 
                            name="lastName" 
                            required 
                            defaultValue={initialData?.lastName} 
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>Phone Number</label>
                        <input 
                            name="phone" 
                            required 
                            defaultValue={initialData?.phone} 
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>Join Date</label>
                        <input 
                            type='date' 
                            name="joinDate" 
                            required 
                            defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""} 
                        />
                    </div>
                    <div className='sm:col-span-2'>
                        <label className='block mb-2'>Bio (Optional)</label>
                        <textarea 
                            name="bio" 
                            required 
                            defaultValue={initialData?.bio} 
                            rows={3} 
                            className='resize-none' 
                            placeholder='Brief Description...' 
                        />
                    </div>
                </div>
            </div>

            {/* Employment Details */}
            <div className='card p-3 sm:p-6'>
                <h3 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100'>
                    Employment Details
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                    <div>
                        <label className='block mb-2'>Department</label>
                        <select name="department" defaultValue={initialData?.department || ""}>
                            <option value="">Select Department</option>
                            {DEPARTMENTS.map((deptName) => (
                                <option value={deptName} key={deptName}>
                                    {deptName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block mb-2'>Position</label>
                        <input
                            name="position"
                            required
                            defaultValue={initialData?.position}
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>Basic Salary</label>
                        <input
                            type='number'
                            name="basicSalary"
                            required
                            defaultValue={initialData?.basicSalary || 0}
                            min={0}
                            step={0.01}
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>Allowances</label>
                        <input
                            type='number'
                            name="allowances"
                            required
                            defaultValue={initialData?.allowances || 0}
                            min={0}
                            step={0.01}
                        />
                    </div>
                </div>
            </div>

            {/* Account Setups */}

            {/* Buttons */}
        </form>
    )
}

export default EmployeeForm