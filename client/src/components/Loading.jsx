import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin size-8 border-2 border-indigo-600 border-t-transparent rounded-full' />
        </div>
    )
}

export default Loading