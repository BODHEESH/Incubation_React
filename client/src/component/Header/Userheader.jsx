import React, { useContext, useEffect, useState } from 'react'
import { CpuChipIcon, BellIcon, UserCircleIcon  } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert'
// import Swal from "react-sweetalert"
import Swal from 'sweetalert2'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { UserContext } from '../../../src/context/userContext';






    function Userheader() {
  const Navigate = useNavigate()

  const {userDetails,setUserDetails} = useContext(UserContext)
  console.log(userDetails,"33333333333333333333333333333333");

  const userId= userDetails.id
  console.log(userId);
  const userName = userDetails.name

  
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
            localStorage.removeItem('token');
              //    navigate("/admin-login")
                 Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'You are successfully logged out',
                  showConfirmButton: false,
                  timer: 1500
                }).then(()=>{
                  Navigate("/login");
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
    <div >
       <nav className='bg-white shadow-lg'>
                <div className='md:flex items-center justify-between py-2 px-8 md:px-12'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='text-2xl font-bold text-gray-800 md:text-3xl'>
                            <a href="#">BODHI TECH</a>
                        </div>
                        <div className='flex gap-6 items-center'>
                        <h4>Welcome {userName}</h4>
                            <div className='flex gap-2 bg-blue-500 py-2 px-3 rounded text-white font-semibold cursor-pointer items-center' onClick={logout}>
                                <ArrowRightIcon className='header-icon ' /> Logout
                            </div>
                        </div>
                    </div>
                    
                </div>
            </nav>

    </div>
  )
}

export default Userheader
