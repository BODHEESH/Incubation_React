import React, { useEffect } from 'react'
import Header from '../../component/Header/Header';
import Navbar from '../../component/Navbar/Navbar';
import {Outlet, useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function Admin() {
  const Navigate = useNavigate()

  useEffect(() => {
    let userData = localStorage.getItem('adminToken')
    if (userData) {
      Navigate('/admin/home')
    } else Navigate("/admin/login");
  }, [Navigate]);

 

  return (
    <div>
      <Header ></Header>
      <div className='w-full min-h-[90vh] flex grid-cols-12 lg:grid'>
            <Navbar ></Navbar>
            <div className='w-full col-span-10 p-4 '>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Admin



