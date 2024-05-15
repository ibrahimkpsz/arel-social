import { RiNotification2Fill, RiSearchLine } from '@remixicon/react'
import { TextInput } from '@tremor/react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import React, { useContext } from 'react'
import { AuthContext } from '@/context/authContext'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'

function Header({ isSidebarOpen }) {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className={`py-5 ${!isSidebarOpen ? "ms-[100px] transition-all ease-in-out header-collapse" : "ms-[300px] header"}`}>
            <TextInput className='bg-[#F9F9F9] border-none p-2 rounded-[8px] lg:w-96 md:w-80 w-full' icon={RiSearchLine} placeholder="Search..." />
        </div>
    )
}

export default Header