import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthContext } from '@/context/authContext';
import { Card, Grid, Text, Title } from '@tremor/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

function Story() {
    const [stories, setStories] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchStories = async () => {
            const response = await axios.get('http://localhost:3000/api/story-list', {
                headers: {
                    Authorization: `Bearer ${currentUser[0].jwttoken}`
                }
            });
            setStories(response.data.data);
        }
        fetchStories();
    }, [])
    return (
        <div>
            <Title className='text-center text-xl font-semibold mb-5'>Story</Title>
            <Grid numItemsLg={2} className='gap-5'>
                {stories.map((story) => (
                    !story.story.includes(".mp4") ? <Card key={story.id} className='flex flex-col items-center justify-end gap-2 rounded-2xl h-96' style={{ backgroundImage: `url(http://localhost:3000/images/story/${story.story})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <Avatar>
                            <AvatarImage src={`http://localhost:3000/images/${story.photo}`} />
                            <AvatarFallback>{story.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Text className='text-white'>{story.username}</Text>
                    </Card> : <Card className='flex flex-col items-center justify-center relative p-0 rounded-2xl h-96 overflow-hidden' >
                        <ReactPlayer className="object-cover" muted={true} playing={true} loop={true} url={`http://localhost:3000/images/story/${story.story}`} />
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

export default Story