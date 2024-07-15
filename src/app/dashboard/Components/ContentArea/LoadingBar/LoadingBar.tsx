import { useGlobalContext } from '@/app/context/GlobalContext'
import Loader from '@/GlobalComponents/Loader'
import React from 'react'

const LoadingBar = () => {
    const { savingStateObject: { isSaving, setIsSaving, savingData, setSavingData } } = useGlobalContext()

    if (isSaving) {
        return (
            <div className="relative px-6 w-full h-[45px] bg-neutral-800 rounded-md flex items-center justify-start gap-2 my-3">
                <div className='flex items-center justify-center gap-1 flex-col'>
                    <Loader />
                    <span className='text-[5px]'>Saving...</span>

                </div>
                <div>
                    <div className='text-sm text-gray-400'>{savingData.title}</div>
                    <div className='text-xs text-gray-500 line-clamp-1'>{savingData.description}</div>
                </div>
            </div>
        )
    }

    return null;
}

export default LoadingBar