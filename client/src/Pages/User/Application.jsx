import React, { useState, useEffect, useRef, useContext } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { UserContext } from '../../../src/context/userContext';
import Userheader from '../../component/Header/Userheader';
import Swal from 'sweetalert2'

function Application() {
    const imageRef = useRef(null);
    const Navigate = useNavigate()
    const [userName, setUserName] = useState({})
    const [application, setApplication] = useState({
        name: '', address: '', email: '', 
        phone: '', company_name: '', Incubation: '',
        image: ''
    })
    const [error, setError] = useState({});

    
    const signupData = {
        ...application
    }

    const {userDetails,setUserDetails} = useContext(UserContext)
    console.log(userDetails,"aplication user id ---------------");

    const userId= userDetails.id
    console.log(userId);
    
    useEffect(() => {
        let userData = localStorage.getItem('token')
        if (userData) {
            setUserName(jwtDecode(localStorage.getItem('token')));
            Navigate('/')
        } else Navigate("/login");
    }, [Navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    };

    const handleChange = (e)=>{
        const { name, value } = e.target
        setApplication({
            ...application, 
            [name]: value,
        })
        console.log(application);
    }
    const fileUpload = (e)=>{
        setApplication({
            ...application,
            image: e.target.files[0]
        })
        console.log(application,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    }

    const applicationForm = async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        for (let key in application){
            formData.append(key, application[key])
        }
        console.log(formData,"________________+++++++++++++");
        const errors = validateForm(signupData)
        setError(errors)

        console.log(Object.keys(errors).length, 'llkklk');
        if (Object.keys(errors).length == 0) {
            console.log("hello");
        
        axios.post(`http://localhost:4000/application?userId=${userId}`, formData).then(response => {
            console.log(response.data);
                if (response.data){
                    // const { name, value = '' } = e.target
                    // setApplication({
                    //     [name]: '',
                    //     image: value
                    // })
                    setApplication({
                        name: '', address: '', email: '',
                        phone: '', company_name: '', Incubation: '',
                    })
                    imageRef.current.value = null;

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Form Submitted sucessfull',
                        showConfirmButton: false,
                        timer: 1500
                      }).then(()=>{
                        // window.location.href = "/"
                        Navigate('/userhome')
                      })
                }
        }).catch(error => console.log(error))
    }
}

    const validateForm = (data) => {
        const error = {};
   
        if (!data.name) {
            error.name = "user name required"
        } 
        if (!data.email) {
            error.email = "email required"
        } 
       
        if (!data.company_name) {
            error.company_name = "company name required"
        } 
        if (!data.address) {
            error.address = "address required"
        } 
        // if (!data.image) {
        //     error.image = "image required"
        // } 
        if (!data.phone) {
            error.phone = " phone number required"
        } else if (data.phone.length != 10) {
            error.phone = "number should be 10 digits"
        }
        

        return error;
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
                            <h4>{userName.name}</h4>
                            <div className='flex gap-2 bg-blue-500 py-2 px-3 rounded text-white font-semibold cursor-pointer items-center' onClick={logout}>
                                <ArrowRightIcon className='header-icon ' /> Logout
                            </div>
                        </div>
                    </div>
                    
                </div>
            </nav> */}
            <main className='flex justify-center items-center w-full min-h-[100vh] py-5'>
                <div className="bg-white flex flex-col rounded-2xl shadow-2xl w-3/4">
                    <div className="w-full text-center py-2" >
                        <h2 className='text-3xl font-bold text-blue-500 mb-2 uppercase'> Application for Incubation </h2>
                        <div className='w-fit mx-auto'>
                            <div className=' bg-blue-500 border-2 w-10 border-blue-500 inline-block mb-2'></div>
                        </div>
                    </div>
                    <form autocomplete="off" onSubmit={applicationForm}>
                        <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="name"  value={application.name} onChange={handleChange} id="name" placeholder='Name *' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                                <p className='text-red-500'>{error.name}</p>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="address"  value={application.address} onChange={handleChange} id="address" placeholder='Address' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                            </div>
                            {/* <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="city"  value={application.city} onChange={handleChange} id="city" placeholder='City *' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="state"  value={application.state} onChange={handleChange} id="state" placeholder='State' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                            </div> */}
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="email"  value={application.email} onChange={handleChange} id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                                <p className='text-red-500'>{error.email}</p>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="number" name="phone"  value={application.phone} onChange={handleChange} id="phone"  placeholder='Phone no' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                                <p className='text-red-500'>{error.phone}</p>
                            </div>
                           <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" name="company_name"  value={application.company_name} onChange={handleChange} id="company_name" placeholder='Company Name' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                                <p className='text-red-500'>{error.company_name}</p>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input ref={imageRef} type="file" name="image" onChange={fileUpload} id="image" placeholder='Image' className='bg-gray-100 outline-none text-sm flex-1 py-1'  />
                            </div>


                             {/* <div className='bg-gray-100 w-full p-2 mb-5 text-left'>
                                <textarea name="background" value={application.background} onChange={handleChange} id="" cols="30" rows="3" className='block w-full bg-gray-100 outline-none text-sm flex-1' placeholder='Describe Your Team and Background *'  ></textarea>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="products" value={application.products} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='Describe Your Company and Products *'  ></textarea>
                            </div>

                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="solve" value={application.solve} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='Describe the Problem your are trying to solve *' ></textarea>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="solution" value={application.solution} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='What is unique about yout solution? *'  ></textarea>
                            </div>

                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="customer" value={application.customer} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='What is your value proposition for the customer? *'  ></textarea>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="advantage" value={application.advantage} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='Who are your competitors and what is your competative advantage? *'  ></textarea>
                            </div>

                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="revenue_model" value={application.revenue_model} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='Explain your revenue model *' ></textarea>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="size_product" value={application.size_product} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='What is the potential market size of the product? *' ></textarea>
                            </div>

                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="products_services" value={application.products_services} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='How do you market or plan to market yout products and services *' ></textarea>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center  mb-5'>
                                <textarea name="proposal" value={application.proposal} onChange={handleChange} id="" cols="30" rows="3" className='bg-gray-100 outline-none text-sm flex-1' placeholder='Upload a Detailed business proposal *'  ></textarea>
                            </div> */}
                            <div>
                                <label htmlFor="" className='text-left'>Type of Incubation needed *</label>
                               <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input  type="radio" name="Incubation" value="physical" onChange={handleChange} id="physical" placeholder='' className=' '  />
                                        <label for="physical" class="text-sm font-medium text-gray-900 ml-2 block" >Physical Incubation</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input   type="radio" name="Incubation" value="virtual" onChange={handleChange} id="virtual" placeholder='' className=' '  />
                                        <label for="virtual" class="text-sm font-medium text-gray-900 ml-2 block">Virtual Incubation</label>
                                    </div>
                               </div>
                            </div>
                        </div>
                        <div className='px-5 w-fit mx-auto pb-5'>
                            <button className='border-2 text-blue-500 border-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </main>

        </div>
    )
}

export default Application
