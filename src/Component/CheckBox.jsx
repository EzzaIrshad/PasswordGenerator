import React from 'react'

function CheckBox({
    icon,
    id,
    label,
    checked,
    onCheckchange
}) {
    
  return (
    <>
        <div className='mt-4 flex items-center justify-between text-white font-semibold'>
            <div className='flex items-center gap-6 ml-2'>
                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>
                <label htmlFor={id} className='text-lg'>{label}</label>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
                <input type="checkbox"
                        checked={checked}
                        id={id}
                        onChange={(e) => onCheckchange && onCheckchange(e.target.value)}
                        className="sr-only"
                />
                <div className={`relative w-11 h-5 ${checked ? 'bg-[#a1c159]' : 'bg-white/80'} rounded-full transition-all`}>
                    <div
                    className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-5 bg-white' : 'translate-x-0  bg-blue-500'}`}
                    />
                </div>
                
            </label>
        </div>
    </>
  )
}

export default CheckBox