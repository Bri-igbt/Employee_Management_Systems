import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/Loading.jsx';
import PaySlipList from '../components/payslip/PaySlipList.jsx';
import GeneratePaySlipForm from '../components/payslip/GeneratePaySlipForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';
import toast from 'react-hot-toast'

const Payslip = () => {
    const [payslips, setPayslips] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user} = useAuth()
    const isAdmin = user?.role === 'ADMIN';

    const fetchPayslips = useCallback(async () => {
        try {
            const res = await api.get('/payslips')
            setPayslips(res.data.data || [])
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message)
        } finally {
            setLoading(false)
        }
    },[])

    useEffect(() => {
        fetchPayslips();
    }, [fetchPayslips])

    useEffect(() => {
        if (isAdmin) api.get('/employees').then((res)=> setEmployees(res.data.filter((i) => !i.isDeleted))).catch(()=>{})
    }, [isAdmin])

    if(loading) return <Loading />
    

    return (
        <div className='animate-fade-in'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                <div>
                    <h1 className='page-title'>Payslips</h1>
                    <p className='page-subtitle'>{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
                </div>

                {isAdmin && <GeneratePaySlipForm onSuccess={fetchPayslips} employees={employees} />}
            </div>

            <PaySlipList isAdmin={isAdmin} payslips={payslips} />
        </div>
    )
}

export default Payslip