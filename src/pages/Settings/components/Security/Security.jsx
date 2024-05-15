import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/authContext';
import { RiCheckboxCircleLine } from '@remixicon/react';
import { Callout, Col, Grid, TabPanel, Text, TextInput, Title } from '@tremor/react'
import axios from 'axios';
import md5 from "md5";
import React, { useContext, useEffect, useState } from 'react'

function Security() {
    const [user, setUser] = useState({});
    const [res, setRes] = useState(null);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:3000/api/user-get', {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            setUser(response.data.data)
        }
        fetchUser();
    }, []);


    const handlePasswordChange = (e) => {
        const hash = md5(e.target.value);
        setUser((prev) => ({ ...prev, [e.target.name]: hash }));
    }

    const editProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user-edit', user, {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            setRes(response.data.message)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <TabPanel>
            <Grid numItemsLg={1} className='gap-5'>
                <Col>
                    <div className='flex flex-col gap-1 mb-5'>
                        <Title>Password</Title>
                        <Text>Update your password</Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <Text>New Password</Text>
                            <TextInput onChange={handlePasswordChange} name='password' placeholder="Enter your new password" />
                        </div>
                        <Button onClick={editProfile}>Update</Button>
                    </div>
                </Col>
            </Grid>
            {res &&
                <Callout
                    className="mt-4"
                    title={res}
                    icon={RiCheckboxCircleLine}
                    color="teal"
                ></Callout>
            }
        </TabPanel>
    )
}

export default Security