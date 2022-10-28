import React,{useState, useEffect} from 'react'
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const Navigate = useNavigate()

  const [logErr, setLogErr] = useState({
    name: true,
    email: true,
    password: true,
    msg: ''
  })

  const [register, setRegister] = useState({
    name: '', 
    email: '',
    password: ''
  })

  const handleChange = (e)=>{
    const {name, value} = e.target
    setRegister({
      ...register,
      [name] : value
    })
  }
  
  const registerForm = (e)=>{
    e.preventDefault()
    if(register.name == ''){
      setLogErr({
        name: false,
        email: true,
        password: true,
        msg: 'Name is required'
      })
    } else if (register.name.length < 3) {
      setLogErr({
        name: false,
        email: true,
        password: true,
        msg: 'Minimum length is 3'
      })
    } else if (!register.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setLogErr({
        name: true,
        email: false,
        password: true,
        msg: 'Email is required'
      })
    } else if (register.password.length < 6) {
      setLogErr({
        name: true,
        email: true,
        password: false,
        msg: 'Minimum length is 6 '
      })
    } else {
      
      axios.post('http://localhost:4000/register', register).then(response => {
        if (response.data.msg){
          setLogErr({
            name: true,
            email: false,
            password: true,
            msg: 'This mail id is already used'
          })
        }else{
          setLogErr({
            name: true,
            email: true,
            password: true,
            msg: ''
          })
          Navigate('/login')
        }
      }).catch(error => console.log(error))
    }
  }

  useEffect(() => {
    let userData = localStorage.getItem('token')
    if (userData) {
      Navigate('/')
    } else Navigate("/register");
  }, [Navigate]);

  return (
    <div>
      <main className='flex justify-center items-center w-full h-[90vh] '>
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className='w-3/5 p-5'>
            <div className='text-left font-bold'>
              <span className="text-blue-500">BODHI </span>TECH
            </div>
            <div className="py-10 text-center">
              <h2 className='text-3xl font-bold text-blue-500 mb-2'> Register Your Account </h2>
              <div className='w-fit mx-auto'>
                <div className=' bg-blue-500 border-2 w-10 border-blue-500 inline-block mb-2'></div>
              </div>
              <div className='flex flex-col items-center'>
                <form onSubmit={registerForm} className='w-full'>

                  <div className='mx-auto w-[75%]'>
                    <div className='bg-gray-100 p-2 flex items-center'>
                      <UserCircleIcon className='text-gray-400 m-2 h-6 w-6' />
                      <input type="text" name="name" value={register.name} onChange={handleChange} id="name" placeholder='User Name' className='bg-gray-100 outline-none text-sm flex-1' />
                    </div>
                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.name ? '' : logErr.msg}</p>
                    <div className='bg-gray-100 p-2 flex items-center'>
                      <EnvelopeIcon className='text-gray-400 m-2 h-6 w-6' />
                      <input type="email" name="email" value={register.email} onChange={handleChange} id="email" placeholder='Email' className='bg-gray-100 outline-none text-sm flex-1' />
                    </div>
                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.email ? '' : logErr.msg}</p>
                    <div className='bg-gray-100 p-2 flex items-center'>
                      <LockClosedIcon className='text-gray-400 m-2 h-6 w-6' />
                      <input type="password" name="password" value={register.password} onChange={handleChange} id="password" placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1' />
                    </div>
                    <p className='font-normal text-xs m-0 mb-5 text-left text-red-600'>{logErr.password ? '' : logErr.msg}</p>
                    <button className='border-2 text-blue-500 border-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white'>Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 text-center'>
            <h2 className='text-3xl font-bold mb-2'> Hello, Friends! </h2>
            <div className='w-fit mx-auto'>
              <div className=' bg-white border-2 w-10 border-white inline-block mb-2'></div>
            </div>
            <p className='mb-10 '>Already have an account? </p>
            <NavLink to='/login'><button className='border-2 text-white border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500'>Login</button></NavLink>

          </div>
        </div>
      </main>

    </div>
  )
}

export default Register