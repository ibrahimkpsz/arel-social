import React, { useContext, useState } from 'react'
import Stories from './components/Stories'
import CreatePost from './components/CreatePost'
import Posts from './components/Posts'
import { AuthContext } from '@/context/authContext';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:3000/api/kesfet', {
      headers: {
        Authorization: `Bearer ${currentUser[0].jwttoken}`
      }
    });
    setPosts(response.data.data)
  }
  return (
    <div className='flex flex-col justify-center gap-5'>
      <Stories />
      <CreatePost onPostCreated={fetchPosts} />
      <Posts posts={posts} setPosts={setPosts} onPostCreated={fetchPosts} />
    </div>
  )
}

export default Feed