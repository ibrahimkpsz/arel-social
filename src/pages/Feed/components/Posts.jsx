import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { AuthContext } from '@/context/authContext';
import { Card, Text } from '@tremor/react'
import { MoreHorizontal, ThumbsUp } from 'lucide-react';
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import ReactPlayer from 'react-player'
import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale('tr');

const timeAgo = (date) => {
    return moment(date).fromNow();
};

function Posts({ posts, onPostCreated }) {
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        onPostCreated();
    });

    const handleDelete = async (postId) => {
        await axios.get('http://localhost:3000/api/delete-post/' + postId, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });

        onPostCreated();
    };

    const handleLike = async (postId) => {
        await axios.get('http://localhost:3000/api/post-like/' + postId, {
            headers: {
                Authorization: `Bearer ${currentUser[0].jwttoken}`
            }
        });

        onPostCreated();
    }
    return (
        <>
            {posts.length > 0 ? posts.map((post, index) => (
                <Card key={index} className='ring-0'>
                    <div className='flex items-center justify-between mb-5'>
                        <div className='flex items-center gap-3'>
                            <Avatar className="w-14 h-14">
                                <AvatarImage src={`http://localhost:3000/images/${post.userPhoto}`} />
                                <AvatarFallback>{currentUser[0].name.slice(0, 1)}{currentUser[0].surname.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <h1 className='text-[14px] font-semibold'>{post.userName} {post.userSurname}</h1>
                                <p className='text-[14px] text-[#475467]'>{timeAgo(post.posts[0].createdDate)}</p>
                            </div>
                        </div>
                        {currentUser[0].id == post.userId && (
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
                                                        <Button size="sm" variant="destructive" onClick={() => { handleDelete(post.posts[0].postId) }}>Delete</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        )}
                    </div>
                    <div className='flex flex-col gap-5'>
                        <p>{post.posts[0].postDescription}</p>
                        {post.posts[0].postPhoto && (post.posts[0].postPhoto.includes(".mp4") ? <ReactPlayer muted={true} playing={true} loop={true} url={`http://localhost:3000/images/${post.posts[0].postPhoto}`} /> : <Card className='rounded-lg h-96' style={{ backgroundImage: `url(http://localhost:3000/images/${post.posts[0].postPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />)}
                    </div>
                    <div className='flex items-center gap-3 mt-6'>
                        <Button onClick={() => handleLike(post.posts[0].postId)} className="flex items-center gap-3" variant='outline'>
                            <ThumbsUp className='w-5 text-[#475467]' />
                            <Text>{post.posts[0].Like} Like</Text>
                        </Button>
                        <Button className="flex items-center gap-3" variant='outline'>
                            <HiChatBubbleOvalLeftEllipsis className='text-2xl text-[#475467]' />
                            <Text>{post.posts[0].TotalAnswer} Comments</Text>
                        </Button>
                    </div>
                </Card>
            )) : <Text className='text-center'>Posts not found.</Text>}
        </>
    )
}

export default Posts
