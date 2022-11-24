import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../src/context/userContext';
import Swal from 'sweetalert2'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Userheader from '../../component/Header/Userheader';



function Userhome() {

    const Navigate = useNavigate()
    const {userDetails,setUserDetails} = useContext(UserContext)
    console.log(userDetails,"33333333333333333333333333333333");

    const userId= userDetails.id
    console.log(userId);
    const userName = userDetails.name

    useEffect(() => {
        let userData = localStorage.getItem('token')
        if (userData) {
            Navigate('/userhome')
        } else Navigate("/login");
    }, [Navigate]);


    // useEffect(() => {
    //     axios.post('http://localhost:4000/userhome').then((response) => {
    //       // console.log("mhgfghfhg", response.data.data)
    //       const userr = response.data.data
    //       console.log(userr,'hhhhhhhhhhhhhhhhhhhhhhhhhh');
    //       JSON.stringify(userr)
    //       console.log('userdetails');
    //       // console.log(userDetails,'errorssssssssss');
    //       if (response.data.status == "errors") {
    //         console.log("No jwt provided")
    //         removeCookie("token")
    
    //         // window.location.href="/login"
            
    //       } else {
    //         setUserDetails(userr)
    //         setState(response.data.data)
    //         setDetails('true')
    //         // console.log(userdetails,'success');
    
    //       }
    
    //     }).catch((error) => {
    //       console.log("err catch", error.message);
    //     })  
    
    
    //   }, [])

    const logout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    };

    // const handleForm = () => {
        
    //     Navigate("/");
    // };



    const handleForm=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/check-application',{userId}).then((response)=>{
          console.log(response.data);
          if (response.data.status=="found") {
            // alert('your application is pending plese wait to approve it.')
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'your application is pending plese wait to approve it.',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            Navigate("/")
          }
        })
      }

  return (
    <div>
      <Userheader />
         {/* <nav className='bg-white shadow-lg'>
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
            </nav> */}
      <main className="flex justify-center items-center w-full h-[90vh] ">
        <div className="bg-white rounded-2xl shadow-2xl flex w-3/3 max-w-4xl">
          <div className="w-5/5 p-5">
            <div className="text-left font-bold">
              <span className="text-blue-500">BODHI </span>TECH
            </div>
            <div className="py-10 text-center">
              <h4 className="text-4xl font-bold text-blue-500 mb-2"> Welcome  Entrepreneur</h4>
              <h2 className="text-2xl font-bold text-blue-500 mb-2"> to the World of oppertunities.Submit your innovative ideas here.</h2>
              <div className="w-fit mx-auto">
                <div className=" bg-blue-500 border-2 w-10 border-blue-500 inline-block mb-2"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="mx-auto w-[100%]"></div>
              </div>
              <div>
                
                <h3>Submit Your Application</h3>
                <button className='border w-full rounded-full my-2 py-2 max-w-[120px] bg-indigo-600  hover:bg-indigo-500  text-white' onClick={handleForm} > Click Here</button>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Userhome;
