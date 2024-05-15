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
    const [ user, setUser ] = useState({});
    const { userId } = useParams(); 

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get(`http://localhost:3000/api/user-profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            {currentUser[0].id === response.data.data.id ? window.location.replace('/users/profile') : setUser(response.data.data)}
            
        }
        fetchUserData();
    }, [userId]);
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
                    <div className='flex items-center gap-2'>
                        <Text><span className='text-black'>Email:</span> {user.email}</Text>
                        <Text><span className='text-black'>Phone:</span> {user.phone}</Text>
                    </div>
                </div>
            </div>


            <Separator className="my-8" />
            <div className='flex flex-col gap-3'>
                
            </div>
        </div>
    )
}

export default UserProfile