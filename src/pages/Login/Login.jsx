import React, { useContext, useState } from 'react'
import { Card, Col, Grid, TextInput, Text, Title } from '@tremor/react';
import LoginImage from '@/assets/login.svg'
import { Fingerprint, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './login.css'
import { AuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await login(user);
            navigate("/");
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className='w-full h-screen login-page'>
            <div className='login-container flex items-center justify-center lg:h-screen py-5'>
                <Card className='p-0 rounded-xl'>
                    <Grid numItemsLg={2} className='lg:grid flex flex-col-reverse'>
                        <Col className='flex items-center p-5'>
                            <Card className='h-full flex flex-col justify-center rounded-lg'>
                                <div className='flex flex-col gap-2 mb-5'>
                                    <Title className='text-[30px] font-semibold text-black'>Login</Title>
                                    <Text className='text-[16px] text-[#475467]'>Please, enter your login details below</Text>
                                </div>
                                <form className='flex flex-col gap-3'>
                                    <TextInput className='max-w-lg p-1' onChange={handleChange} name='email' placeholder='Email Address' icon={User2} />
                                    <TextInput className='max-w-lg p-1' type='password' onChange={handleChange} name='password' placeholder='Password' icon={Fingerprint} />
                                    <Text className='text-red-500'>{error}</Text>
                                    <Button onClick={handleClick} className="max-w-lg mt-4">Login</Button>
                                </form>
                                <div className='mt-3'>
                                    <Text className='text-[#475467]'>Don't have an account? <a href='/register' className='text-[#3B82F6]'>Register</a></Text>
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

export default Login