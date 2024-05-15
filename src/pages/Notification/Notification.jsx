import { AuthContext } from '@/context/authContext';
import { Card, Text, Title } from '@tremor/react';
import axios from 'axios';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import moment from 'moment';
import 'moment/locale/tr';
import React, { useContext, useEffect, useState } from 'react'

moment.locale('tr');

const timeAgo = (date) => {
    return moment(date).fromNow();
};

function Notification() {
    const [notification, setNotification] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/nofication', {
                    headers: {
                        Authorization: `Bearer ${currentUser[0].jwttoken}`
                    }
                });
                setNotification(response.data.data);

            } catch (error) {

            }
        };
        fetchNotification();
        console.log(notification)
    }, []);
    return (
        <div>
            <Title className='text-xl font-semibold'>Notification</Title>
            <div className='flex flex-col gap-5 mt-5'>
                {notification.map((item, index) => (
                    <div className='flex items-center justify-between bg-white p-5 rounded-lg' key={index}>
                        <div className='flex items-center gap-5'>
                            <div>
                                {item.type === 1 ? (
                                    <MessageCircle className='w-8 h-8 text-[#475467]' />
                                ) : (
                                    <ThumbsUp className='w-10 h-10 p-2.5 rounded-full bg-[#1366ff] text-[#ffffff]' />
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <p>{item.message}</p>
                                <Text>{timeAgo(item.formatted_date)}</Text>
                            </div>
                        </div>
                        {item.post_photo && (
                            <Card className='w-10' style={{ background: `url(http://localhost:3000/images/${item.post_photo})`, backgroundSize: "cover" }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification