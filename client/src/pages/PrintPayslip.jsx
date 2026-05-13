import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { dummyPayslipData } from '../assets/assets.jsx';
import Loading from '../components/Loading.jsx';
import { format } from 'date-fns'

const PrintPayslip = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id))
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [id])

  if(loading) return <Loading />
  if(!payslip) return <p className='text-center py-12 text-slate-400'>No payslip found</p>
  

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white animate-fade-in'>
      <div className='text-center border-b border-slate-200 pb-6 mb-8'>
        <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>PAYSLIP</h1>
        <p className='text-slate-500 text-sm mt-1'>
          {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
      </div>

      <div className='grid grid-cols-2 gap-6 mb-8'>
        <div>
          <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Employee Name</p>
          <p className='font-semibold text-slate-900'>
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Position</p>
          <p className='font-semibold text-slate-900'>
            {payslip.employee?.position} 
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Email</p>
          <p className='font-semibold text-slate-900'>
            {payslip.employee?.email}
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400 uppercase tracking-wider mb-1'>Period</p>
          <p className='font-semibold text-slate-900'>
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrintPayslip