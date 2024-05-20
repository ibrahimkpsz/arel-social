import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/context/authContext';
import { Card, Text, Title } from '@tremor/react';
import axios from 'axios';
import { Edit, MoreHorizontal, ThumbsUp } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

const timeAgo = (date) => {
    return moment(date).fromNow();
};

function UserProfile() {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { userId } = useParams();

    const fetchUserData = async () => {
        const response = await axios.get(`http://localhost:3000/api/user-profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });
        { currentUser[0].id === response.data.data.id ? window.location.replace('/users/profile') : setUser(response.data.data) }
    }

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const handleLike = async (postId) => {
        const response = await axios.get('http://localhost:3000/api/post-like/' + postId, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });
        
        fetchUserData();
        console.log(response)
    }
    return (
        <div className='p-5'>
            <div className='flex items-center gap-5'>
                <Avatar className="w-32 h-32">
                    <AvatarImage />
                    <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1.5 justify-center w-full'>
                    <div className='flex justify-between'>
                        <Title>{user.name} {user.surname}</Title>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Text>20 Gönderi</Text>
                        <Text>100 Beğeni</Text>
                    </div>
                    <Text className='text-black'>{user.biography}</Text>
                </div>
            </div>


            <Separator className="my-8" />
            <div className='flex flex-col gap-3'>
                {user.posts && user.posts.map((post, index) => (
                    <Card key={index} className='ring-0'>
                        <div className='flex items-center justify-between mb-5'>
                            <div className='flex items-center gap-3'>
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
                                    <AvatarFallback>{currentUser[0].name.slice(0, 1)}{currentUser[0].surname.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <h1 className='text-[14px] font-semibold'>{user.name} {user.surname}</h1>
                                    <p className='text-[14px] text-[#475467]'>{timeAgo(post.createDate)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p>{post.description}</p>
                            {post.photo && (post.photo.includes(".mp4") ? <ReactPlayer muted={true} playing={true} loop={true} url={`http://localhost:3000/images/${post.photo}`} /> : <Card className='rounded-lg h-96' style={{ backgroundImage: `url(http://localhost:3000/images/${post.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />)}
                        </div>
                        <div className='flex items-center gap-3 mt-6'>
                            <Button onClick={() => handleLike(post.id)} className="flex items-center gap-3" variant='outline'>
                                <ThumbsUp className='w-5 text-[#475467]' />
                                <Text>{post.totalLikes} Like</Text>
                            </Button>
                            <Button className="flex items-center gap-3" variant='outline' >
                                <HiChatBubbleOvalLeftEllipsis className='text-2xl text-[#475467]' />
                                <Text>{post.totalAnswer} Comments</Text>
                            </Button>
                        </div>
                        <div>
                            <ul>
                                <li>yorum</li>
                                <li>yorum</li>
                                <li>yorum</li>
                            </ul>
                        </div>
                        <form action="">
                            <input type="text" />
                            <button>gödner</button>
                        </form>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default UserProfile