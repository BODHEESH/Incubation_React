import React, { } from 'react'
import { navLinks } from './Utils/NavDb';
import { useRecoilState } from 'recoil'
import { ActiveTabState } from '../../atoms/ActiveTabState';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <div className='bg-[#1e90ff] col-span-5 border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[250px] lg:col-span-2 pt-8 flex flex-col items-start justify-between'>
      <div className=' space-y-8 w-full'>
        {
          navLinks.map((link) => <NavItem link={link} key={link.id} />)
        }
        {/* <div className='w-full border-t border-[#abe2b4]	' />
        {
          navLinks.slice(5, 6).map((link) => <NavItem link={link} key={link.id} />)
        } */}
      </div>
    </div>
  )
}

function NavItem({ link }) {
  const [ActiveNavItem, SetActiveNavItem] = useRecoilState(ActiveTabState);
  return (
    <div onClick={() => SetActiveNavItem(link.id)} key={link.id} className={`w-full flex items-center justify-start space-x-8 px-8 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${ActiveNavItem === link.id && "border-gray-900"}`}>
      <NavLink to={link.path} className='w-full flex items-center justify-start'>
        <span>{link.icon}</span>
        <h1 className={` text-gray-1000 px-4 group-hover:text-black xl:flex hidden ${ActiveNavItem === link.id && "text-black"}`}>{link.title}</h1>
      </NavLink>
    </div>
  )
}

export default Navbar
