import React, { useContext, useState } from 'react'
import { Card, Col, Grid, TextInput, Text, Title } from '@tremor/react';
import LoginImage from '@/assets/login.svg'
import { Fingerprint, Mail, PhoneIcon, User2, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './register.css'
import { useCookies } from 'react-cookie';
import { AuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    username: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data)
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/register", data);
      navigate("/login")
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className='w-full h-screen register-page'>
      <div className='register-container flex items-center justify-center lg:h-screen py-5'>
        <Card className='p-0 rounded-xl'>
          <Grid numItemsLg={2} className='lg:grid flex flex-col-reverse'>
            <Col className='flex items-center p-5'>
              <Card className='h-full flex flex-col justify-center rounded-lg'>
                <div className='flex flex-col gap-2 mb-5'>
                  <Title className='text-[30px] font-semibold text-black'>Register</Title>
                  <Text className='text-[16px] text-[#475467]'>Please, enter your register details below</Text>
                </div>
                <form className='flex flex-col gap-3'>
                  <TextInput className='max-w-lg p-1' onChange={handleChange} name='username' placeholder='Username' icon={UserRound} required />
                  <div className='flex items-center gap-3'>
                    <TextInput className='max-w-lg p-1' onChange={handleChange} name='name' placeholder='Name' required />
                    <TextInput className='max-w-lg p-1' onChange={handleChange} name='surname' placeholder='Surname' required />
                  </div>
                  <TextInput className='max-w-lg p-1' onChange={handleChange} name='phone' placeholder='Phone' icon={PhoneIcon} required />
                  <TextInput className='max-w-lg p-1' onChange={handleChange} name='email' placeholder='Email Address' icon={Mail} required />
                  <TextInput className='max-w-lg p-1' type='password' onChange={handleChange} name='password' placeholder='Password' icon={Fingerprint} required />
                  <TextInput className='max-w-lg p-1' type='password' onChange={handleChange} name='password2' placeholder='Re-Password' icon={Fingerprint} required />
                  <Text className='text-red-500'>{err}</Text>
                  <Button onClick={handleClick} className="max-w-lg mt-4">Register</Button>
                </form>
                <div className='mt-3'>
                  <Text className='text-[#475467]'>Don't have an account? <a href='/login' className='text-[#3B82F6]'>Login</a></Text>
                </div>
              </Card>
            </Col>
            <Col className=''>
              <img className='w-full lg:rounded-xl rounded-t-xl' src={LoginImage} alt='Login' />
            </Col>
          </Grid>
        </Card>
      </div>
    </div>
  )
}

export default Register