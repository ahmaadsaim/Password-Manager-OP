import React from 'react'

const navbar = () => {
    return (
        <nav className='bg-slate-900'>
            <div className="mycontainer flex justify-between items-center h-14 px-4 py-5">
                <div className="logo font-bold flex">
                    <span className='text-green-500'>
                        &lt;
                    </span>
                    <span className='text-white'>PassOp/</span>
                    <span className='text-green-500'>&gt;
                    </span>
                </div>
                <ul>
                    <li className='flex gap-3 '>
                        <a className='hover:font-bold text-white' href="">Home</a>
                        <a className='hover:font-bold text-white' href="">About</a>
                        <a className='hover:font-bold text-white' href="">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default navbar
