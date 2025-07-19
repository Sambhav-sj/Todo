import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white p-3'>
      <div className="logo">
        <span className="font-bold text-xl mx-3">Task Manager</span>
      </div>
      <ul className="flex gap-8 mx-3">
        <li className='cursor-pointer hover:font-bold transition-none'>Home</li>
        <li className='cursor-pointer w-max hover:font-bold transition-none'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
