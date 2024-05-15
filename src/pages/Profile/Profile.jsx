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
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

const timeAgo = (date) => {
    return moment(date).fromNow();
};

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    const handleDelete = async (postId) => {
        await axios.get('http://localhost:3000/api/delete-post/' + postId, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });

        fetchPosts();
    };

    const handleLike = async (postId) => {
        await axios.get('http://localhost:3000/api/post-like/' + postId, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });
        console.log(postId)
        fetchPosts();
    }

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3000/api/own-profile', {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });
        setPosts(response.data.data.posts)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get('http://localhost:3000/api/user-get', {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            setUser(response.data.data)
        }
        fetchUserData();
        fetchPosts();
    }, []);
    return (
        <div className='p-5'>
            <div className='flex items-center gap-5'>
                <Avatar className="w-32 h-32">
                    <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
                    <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1.5 justify-center w-full'>
                    <div className='flex justify-between'>
                        <Title>{user.name} {user.surname}</Title>
                        <Link to="/settings">
                            <Edit className='w-4 text-[#475467]' />
                        </Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Text>20 Gönderi</Text>
                        <Text>100 Beğeni</Text>
                    </div>
                    <Text className='text-black'>{user.biography}</Text>
                    <div className='flex items-center gap-2'>
                        <Text><span className='text-black'>Email:</span> {user.email}</Text>
                        <Text><span className='text-black'>Phone:</span> {user.phone}</Text>
                    </div>
                </div>
            </div>


            <Separator className="my-8" />
            <div className='flex flex-col gap-3'>
                {posts.length > 0 ? posts.map((post, index) => (
                    <Card key={index} className='ring-0'>
                        <div className='flex items-center justify-between mb-5'>
                            <div className='flex items-center gap-3'>
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
                                    <AvatarFallback>{user.name}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <h1 className='text-[14px] font-semibold'>{user.name} {user.surname}</h1>
                                    <p className='text-[14px] text-[#475467]'>{timeAgo(post.createDate)}</p>
                                </div>
                            </div>
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className='w-5 text-[#475467]' />
                                        </Button>
                                    </MenubarTrigger>
                                    <MenubarContent align="end">
                                        <MenubarItem>Edit</MenubarItem>
                                            <Dialog>
                                                <DialogTrigger className='relative w-full flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>Delete</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Gönderiyi silmek istiyor musunuz!</DialogTitle>
                                                        <DialogDescription>
                                                            Bu işlem geri alınamaz.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose>
                                                            <Button size="sm" vairant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <DialogClose>
                                                            <Button size="sm" variant="destructive" onClick={() => { handleDelete(post.id) }}>Delete</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p>{post.description}</p>
                            {post.photo && (post.photo.includes(".mp4") ? <ReactPlayer muted={true} playing={true} loop={true} url={`http://localhost:3000/images/${post.photo}`} /> : <Card className='rounded-lg h-96' style={{ backgroundImage: `url(http://localhost:3000/images/${post.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />)}
                        </div>
                        <div className='flex items-center gap-3 mt-6'>
                            <Button onClick={() => {handleLike(post.id)}} className="flex items-center gap-3" variant='outline'>
                                <ThumbsUp className='w-5 text-[#475467]' />
                                <Text>{post.totalLikes} Like</Text>
                            </Button>
                            <Button className="flex items-center gap-3" variant='outline'>
                                <HiChatBubbleOvalLeftEllipsis className='text-2xl text-[#475467]' />
                                <Text>{post.totalAnswer} Comments</Text>
                            </Button>
                        </div>
                    </Card>
                )) : <Text className='text-center'>Posts not found.</Text>}
            </div>
        </div>
    )
}

export default Profile