import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispathch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] =useState("")

    const login = async(data)=>{
      setError("") //clean error before start
      try {
        const session = await authService.login(data)
        if(session){
          const userData = await authService.getCurrentUser()
          if(userData) dispathch(authLogin(userData))
          navigate("/")
        }
      } catch (error) {
        setError(error.message)
      }
    }
  return (
    <div
    className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100
        rounded-xl p-10 border border-balck/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width="100%"/>
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
          <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className='font-medium text-primary transition-all
              duration-200 hover:underline'
            >Sign Up
              
            </Link>
        </p>
        {error && <P className="text-red-600 mt-8 text-center">{error}</P> }

        
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input 
            label="Email:"
            placeholder = "Enter your email"
            type="email"
            {...register("email",{
              required:true,
              validate:{
                matchPatern:(value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || 
                "Email address must be a valid addres"
              }
            })}
            />
            <Input  
            label="password"
            type="password"
            placeholder="Enter your password"
            {...register("password",{
              required:true,
            })}
            />
            <Button
            type="submit"
            className='w-full'
            >Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login