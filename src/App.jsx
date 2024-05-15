import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { AuthContext } from '@/context/authContext';
import React, { useContext, useState } from 'react'
import { Col, Grid } from '@tremor/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Topics from './components/Topics';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Story from './pages/Story/Story';
import Settings from './pages/Settings/Settings';
import Notification from './pages/Notification/Notification';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {

  const { currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Layout = () => {
    return (
      <div className='container mx-auto relative'>
        <div className="flex">
          <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="w-full p-0">
            <Header isSidebarOpen={isSidebarOpen} />
            <div className={`mt-24 ${!isSidebarOpen ? "ms-[100px] transition-all ease-in-out" : "ms-[300px]"}`}>
              <Grid numItemsLg={9} className="gap-6">
                <Col numColSpanLg={6} className='bg-[#F9F9F9] p-[20px] rounded-2xl'>
                  <Outlet />
                </Col>
                <Col numColSpanLg={3}>
                  <Topics />
                </Col>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Feed /> },
        { path: "/story", element: <Story /> },
        { path: "/partners", element: <h1>Partners</h1> },
        { path: "/settings", element: <Settings /> },
        { path: "/users/:userId", element: <UserProfile /> },
        { path: "/users/profile", element: <Profile /> },
        { path: "/notification", element: <Notification /> },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
