import React, { useContext, useEffect, useState } from 'react'
import Stories from './components/Stories'
import CreatePost from './components/CreatePost'
import Posts from './components/Posts'
import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import Loading from '@/assets/loading.gif'

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:3000/api/kesfet', {
      headers: {
        Authorization: `Bearer ${currentUser[0].jwttoken}`
      }
    });
    setPosts(response.data.data)
    setLoading(false);
  }
  return (
    <div className='flex flex-col justify-center gap-5'>
      <Stories />
      <CreatePost onPostCreated={fetchPosts} />
      {loading ? (
        <img src={Loading} alt='Loading...' width={200} className='mx-auto' />
      ) : (
        <Posts posts={posts} setPosts={setPosts} onPostCreated={fetchPosts} />
      )}
    </div>
  )
}

export default Feed