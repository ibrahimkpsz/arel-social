import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/authContext';
import { RiCheckboxCircleLine } from '@remixicon/react';
import { Callout, TabPanel, Text, TextInput, Textarea } from '@tremor/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

function EditProfile() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [res, setRes] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('http://localhost:3000/api/user-get', {
        headers: {
          Authorization: `Bearer ${currentUser[0].jwttoken}`,
        },
      });

      setUser(response.data.data);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUser((prev) => ({ ...prev, photo: selectedFile }));
  };

  const editProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('name', user.name);
    formData.append('surname', user.surname);
    formData.append('phone', user.phone);
    formData.append('biography', user.biography);
    formData.append('photo', user.photo);

    try {
      const response = await axios.post('http://localhost:3000/api/user-edit', formData, {
        headers: {
          Authorization: `Bearer ${currentUser[0].jwttoken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(user);
      setRes(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <TabPanel>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col items-center mb-5'>
                    <Avatar className="w-32 h-32">
                        <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
                        <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
                    </Avatar>
                    <div className='border w-full p-2.5 mt-5 text-sm rounded-md cursor-pointer hover:bg-slate-50'>
                        <input id='profile_photo' type="file" name='photo' onChange={handleFileChange} accept="image/jpeg,image/png,image/gif" hidden />
                        <label htmlFor='profile_photo'>
                            <div className='flex items-center gap-2'>
                                <p>Change Photo</p>
                            </div>
                        </label>
                    </div>
                </div>
                {res &&
                    <Callout
                        className="mb-4 w-96"
                        title={res}
                        icon={RiCheckboxCircleLine}
                        color="teal"
                    />
                }
                <form className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col gap-1'>
                        <Text>Username</Text>
                        <TextInput name='username' onChange={handleChange} className='lg:w-96 md:w-80' placeholder={user.username} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Text>Name</Text>
                        <TextInput name='name' onChange={handleChange} className='lg:w-96 md:w-80' placeholder={user.name} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Text>Surname</Text>
                        <TextInput name='surname' onChange={handleChange} className='lg:w-96 md:w-80' placeholder={user.surname} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Text>Phone</Text>
                        <TextInput name='phone' onChange={handleChange} className='lg:w-96 md:w-80' placeholder={user.phone} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Text>Biography</Text>
                        <Textarea name='biography' onChange={handleChange} className='lg:w-96 md:w-80' placeholder={user.biography} />
                    </div>
                    <Button onClick={editProfile} className="w-full mt-2">Save</Button>
                </form>
            </div>
        </TabPanel>
    )
}

export default EditProfile