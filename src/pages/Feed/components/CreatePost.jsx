import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/context/authContext';
import { Card, Text, TextInput } from '@tremor/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

function CreatePost({ onPostCreated }) {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get('http://localhost:3000/api/user-get', {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`,
                },
            });
            setUser(response.data.data);
        }
        fetchUserData();
    }, [])

    const [post, setPost] = useState({
        photo: null,
        tags: '',
        description: '',
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPost((prev) => ({ ...prev, photo: file }));
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (post.description === '') {
            setError(true);
            setResponse("Description and photo are required.");
            return;
        } else {
            setError(false);
        }

        const formData = new FormData();
        formData.append('description', post.description);
        formData.append('photo', post.photo);
        formData.append('tags', post.tags);

        try {
            const response = await axios.post('http://localhost:3000/api/create-post', formData, {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPost({
                photo: null,
                tags: '',
                description: '',
            });
            setFileName('');
            setResponse(response.data.message);
            onPostCreated();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setResponse("File size cannot exceed 5MB.");
            } else {
                setResponse("An error occurred while creating the post.");
            }
        }
    };

    return (
        <Card className='rounded-lg ring-0'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center gap-5'>
                    <div className='flex items-center gap-5'>
                        <Avatar className="w-14 h-14">
                            <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
                            <AvatarFallback>{currentUser[0].name.slice(0, 1)}{currentUser[0].surname.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <TextInput error={error} type="text" name='description' onChange={handleChange} placeholder="What's on your mind?" value={post.description} className="w-full p-3 rounded-[8px] border-none bg-[#F2F2F2] focus:outline-none" />
                    </div>
                    <div className='flex items-center gap-3'>
                        <Text>Tags:</Text>
                        <TextInput onChange={handleChange} name='tags' placeholder='Type something...' className='w-full rounded-[8px] border-none bg-[#F2F2F2] focus:outline-none' />
                    </div>
                </div>
                {response && <p className="mt-5">{response}</p>}
                <Separator className="my-5" />
                <div className='flex items-center justify-between'>
                    <div>
                        <input type='file' id='photo' name='photo' accept="image/jpeg,image/png,image/gif,video/mp4,video/avi,video/mov" onChange={handleFileChange} className="rounded-lg" variant="outline" size="icon" hidden />
                        <label className='border p-2.5 text-sm font-semibold rounded-md cursor-pointer hover:bg-slate-50' htmlFor='photo'>
                            Add File
                        </label>
                        {fileName && <span className="text-sm ps-3">{fileName}</span>}
                    </div>
                    <Button type="submit" className="px-10">Post</Button>
                </div>
            </form>
        </Card>
    );
}

export default CreatePost;
