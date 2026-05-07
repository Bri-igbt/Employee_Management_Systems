import { CalendarIcon } from 'lucide-react';
import React from 'react'

const AttendanceStats = ({ history }) => {
    const totalPresent = history.filter((h) => h.status === 'PRESENT' | h.status === 'LATE').length;
    const totalLate = history.filter((h) => h.status === 'LATE').length;
    const stats = [
        { label: "Days Present", value: totalPresent, icon: CalendarIcon }
    ]
    return (
        <div>

        </div>
    )
}

export default AttendanceStats