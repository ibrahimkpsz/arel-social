import { AuthContext } from '@/context/authContext';
import { Card, Text, Title } from '@tremor/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

function Topics() {
  const { currentUser } = useContext(AuthContext);
  const [trendingTopics, setTrendingTopics] = useState([]);
  useEffect(() => {
    const fetchTrendingTopics = async () => {
      const response = await axios.get('http://localhost:3000/api/trend-topic', {
        headers: {
          Authorization: `Bearer ${currentUser[0].jwttoken}`
        }
      });
      setTrendingTopics(response.data.data);
    };
    fetchTrendingTopics();
  }, [])
  return (
    <div className='trending-topic'>
      <Title>Trending Topics</Title>
      <div className='flex flex-col gap-0 mt-5'>
        {trendingTopics.map((topic, index) => (
          <div className='border-b py-3'>
            <div className='flex flex-col gap-1'>
              <span className='text-[12px] font-medium'>Gündemde {index + 1}. sırada</span>
              <div className='flex flex-col'>
                <h1 className='text-black text-[15px] font-semibold'>#{topic.tag}</h1>
                <Text className='text-[#475467] text-[13px]'>{topic.total_count} posts</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topics