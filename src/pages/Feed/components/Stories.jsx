import { AuthContext } from '@/context/authContext';
import { Card, Col, Grid, Text } from '@tremor/react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import axios from 'axios';
import { PlusCircle, VideoIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { HiMiniPhoto, HiPhoto } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import ReactPlayer from 'react-player';
import { redirect } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Stories() {
    const [stories, setStories] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [story, setStory] = useState({
        story: null
    });

    const handleChange = (e) => {
        setStory((prev) => ({ ...prev, story: e.target.files[0] }));
    }

    const createStory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('story', story.story);
        try {
            await axios.post('http://localhost:3000/api/story-create', formData, {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStory({
                story: null
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        const fetchStories = async () => {
            const response = await axios.get('http://localhost:3000/api/story-list', {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            console.log(response.data.data)
            setStories(response.data.data);
        }
        fetchStories();
    }, [])
    return (
        <div>
            <Grid numItemsLg={4} numItemsMd={3} className='gap-3'>
                <Col numColSpanLg={1} numColSpanMd={3}>
                    <Card className='flex flex-col items-center justify-end rounded-2xl h-48'>
                        <Dialog>
                            <DialogTrigger className='flex flex-col items-center'>
                                <PlusCircle className='w-10 h-10' />
                                <p className='mt-3'>Create Story</p>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Story</DialogTitle>
                                </DialogHeader>
                                <div className='flex items-center justify-between gap-5'>
                                    <div className='border w-full p-2.5 text-sm font-semibold rounded-md cursor-pointer hover:bg-slate-50'>
                                        <input id='story_photo' onChange={handleChange} type="file" name='story' accept="image/jpeg,image/png,image/gif" hidden />
                                        <label htmlFor='story_photo'>
                                            <div className='flex items-center gap-2'>
                                                <HiPhoto size={20} /> Add Photo
                                            </div>
                                        </label>
                                    </div>
                                    <div className='border w-full p-2.5 text-sm font-semibold rounded-md cursor-pointer hover:bg-slate-50'>
                                        <input id='story_video' onChange={handleChange} type="file" accept='video/mp4,video/avi,video/mov' hidden />
                                        <label htmlFor='story_video'>
                                            <div className='flex items-center gap-2'>
                                                <VideoIcon size={20} /> Add Video
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <DialogFooter className="mt-3">
                                    <DialogClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose>
                                        <Button onClick={createStory}>Send</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </Col>
                {stories.slice(0, 3).map((story) => (
                    !story.story.includes(".mp4") ?
                        (
                            <Card key={story.id} className='flex flex-col items-center justify-end gap-2 rounded-2xl h-48' style={{ backgroundImage: `url(http://localhost:3000/images/story/${story.story})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <Avatar>
                                    <AvatarImage src={`http://localhost:3000/images/${story.photo}`} />
                                    <AvatarFallback>{story.username.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <Text className='text-white'>{story.username}</Text>
                            </Card>
                        ) : <Card className='flex flex-col items-center justify-end rounded-2xl m-0 p-0 h-48 overflow-hidden relative' >
                            <ReactPlayer muted={true} playing={true} loop={true} url={`http://localhost:3000/images/story/${story.story}`} />
                            <div className='z-20 absolute flex flex-col items-center gap-2 bottom-6'>
                                <Avatar>
                                    <AvatarImage src={`http://localhost:3000/images/${story.photo}`} />
                                    <AvatarFallback>{story.username.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <Text className='text-white'>{story.username}</Text>
                            </div>
                        </Card>
                ))}
            </Grid>
        </div>
    )
}

export default Stories