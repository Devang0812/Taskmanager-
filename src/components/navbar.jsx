import React from 'react'

const navbar = () => {
    return (
        <nav className='flex items-center md:justify-between bg-slate-900 text-white py-2 sticky top-0  z-10'>
            <div className="logo">
               <span className='font-bold text-3xl mx-9'>eTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className=' md:w-[4.4rem] text-center cursor-pointer md:text-lg md:hover:text-xl font-bold transition-all duration-350  hover:bg-slate-700 rounded-md md:px-2 md:py-1'>Home</li>
                <li className=' md:w-[7.4rem] cursor-pointer md:text-lg md:hover:text-xl font-bold transition-all rounded-md md:pl-2  hover:bg-slate-700 duration-350 md:py-1'>Your Tasks</li>
            </ul>

        </nav>
    )
}

export default navbar
