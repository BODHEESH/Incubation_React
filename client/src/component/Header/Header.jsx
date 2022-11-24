import React from 'react'
import { CpuChipIcon, BellIcon, UserCircleIcon  } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert'
// import Swal from "react-sweetalert"
import Swal from 'sweetalert2'
import 'react-confirm-alert/src/react-confirm-alert.css';




    function Header() {
  const Navigate = useNavigate()

  
const logout=(()=>{
  console.log('gfdghsfgdfjgjhkj');
  // removeCookie("admin-token")
  // alert('Logout Sucessfully')
  // window.location.href="/admin-login"
  confirmAlert({
      
      title: 'Confirm to submit',
      message: 'Are you sure to Logout.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('adminToken');
              //    navigate("/admin-login")
                 Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'You are successfully logged out',
                  showConfirmButton: false,
                  timer: 1500
                }).then(()=>{
                  Navigate("/admin");
                })
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
 
})


  // const logout = () => {
  //   localStorage.removeItem('adminToken');
  //   Navigate("/admin");
  // };
  return (
    <div className='bg-[#1e90ff] w-full py-6 items-center justify-between flex px-12 shadow-md shadow-[#f2f2f2] '>
      {/* Search */}
      <div className='w-full lg:flex hidden space-x-4 items-center justify-start py-2'>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input type='text' name='' id='' placeholder='Search anything....' className='bg-white outline-none' />
      </div>
      {/* Logo */}
      <div className='items-center w-full justify-center flex space-x-4'>
        {/* <CpuChipIcon className='w-6 h-6' /> */}
        <h1 className='text-xl text-gray-100 font-medium'>BODHI TECH </h1>
      </div>
      {/* Icon */}

      <div className='items-center justify-end space-x-6 flex w-full'>
        <BellIcon className='header-icon'/>
        <div className='flex gap-2 bg-blue-300 py-2 px-3 rounded text-gray-700 font-semibold cursor-pointer justify-center items-center' onClick={logout}>
          <UserCircleIcon className='header-icon' /> Logout
        </div>
      </div>

    </div>
  )
}

export default Header
