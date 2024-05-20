import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom'
import { Bell, Compass, LifeBuoy, LogOut, Settings, ToggleLeft, ToggleRight, UserRound, VideoIcon } from "lucide-react";
import Logo from '@/assets/logo.svg'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import axios from "axios";

function Sidebar({ toggleSidebar, isSidebarOpen }) {

  const data = [
    { name: 'Feed', link: '/', icon: <Compass className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
    { name: 'Story', link: '/story', icon: <VideoIcon className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
    { name: 'Profile', link: '/users/profile', icon: <UserRound className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
    { name: 'Notification', link: '/notification', icon: <Bell className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
    { name: 'Partners', link: '/partners', icon: <LifeBuoy className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
    { name: 'Settings', link: '/settings', icon: <Settings className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> },
  ]

  const classes = `sidebar ${!isSidebarOpen && 'hiddenSidebar'}`;
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('http://localhost:3000/api/user-get', {
        headers: {
          Authorization: `Bearer ${currentUser[0].jwttoken}`
        }
      });
      setUser(response.data.data.userData)
    }
    fetchUserData();
  }, [])

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className={classes}>
        <Button variant="ghost" className="w-full transition-all ease-in-out" onClick={toggleSidebar}>
          {isSidebarOpen ? <ToggleRight /> : <ToggleLeft />}
        </Button>
        <div className='flex justify-between items-center my-5'>
          <h1 className={`p-5 text-xl font-bold flex items-center gap-3 ${!isSidebarOpen ? "mx-auto" : "mx-0"}`}><img src={Logo} width={25} alt="" /> <span className={`${!isSidebarOpen ? "hidden" : "block"}`}>Social App</span></h1>
        </div>
        <div className={isSidebarOpen ? "flex items-center gap-3 p-5 mx-3 my-5 bg-[#F8F8F8] rounded-lg" : "flex items-center gap-0 p-5 mx-3 bg-[#F8F8F8] rounded-lg"}>
          <Avatar>
            <AvatarImage src={`http://localhost:3000/images/${user.photo}`} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <div className={isSidebarOpen ? "block" : "hidden"}>
            <h1 className='text-[14px] font-semibold'>{user.name} {user.surname}</h1>
            <p className='text-[14px] text-[#475467]'>{user.email}</p>
          </div>
        </div>

        <div>
          <ul className='flex flex-col py-3 gap-2'>
            {data.map((item, index) => (
              <li className='mx-3' key={index}>
                <Button className={isSidebarOpen ? "w-full text-[#344054] font-semibold justify-start" : "w-full text-[#344054] font-semibold justify-center"} variant="ghost" asChild>
                  <NavLink activeClassName="bg-slate-50" to={item.link}>{item.icon} <span className={isSidebarOpen ? "block" : "hidden transition-all ease-in-out"}>{item.name}</span></NavLink>
                </Button>
              </li>
            ))}
            <li className='mx-3'>
              <Button onClick={logout} className={isSidebarOpen ? "w-full text-[#344054] font-semibold justify-start" : "w-full text-[#344054] font-semibold justify-center"} variant="ghost" asChild>
                <NavLink activeClassName="bg-slate-50"><LogOut className={isSidebarOpen ? "mr-2 w-5 text-[#667085]" : "mr-0 w-5 text-[#667085]"} /> <span className={isSidebarOpen ? "block" : "hidden transition-all ease-in-out"}>Logout</span></NavLink>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default Sidebar