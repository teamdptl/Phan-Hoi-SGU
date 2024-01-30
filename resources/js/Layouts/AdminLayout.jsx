import {
    ChartBarIcon,
    ChatBubbleBottomCenterTextIcon,
    Squares2X2Icon,
    TvIcon, UserIcon,
} from '@heroicons/react/24/outline'
import {useEffect, useState} from "react";
import AdminSideBar from "@/Layouts/AdminSideBar.jsx";
import AdminContent from "@/Layouts/AdminContent.jsx";

export default function AdminLayout({children}){
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [listTab, setListTab] = useState([
        {
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            activeIcon: <ChartBarIcon className="h-4 w-4 text-white"/>,
            name: 'Bảng điều khiển',
            href: '/admin/dashboard'
        },
        {
            icon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-black"/>,
            activeIcon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-white"/>,
            name: 'Báo hỏng',
            href: '/admin/report'
        },
        // {
        //     icon: <StarIcon className="h-4 w-4 text-black"/>,
        //     activeIcon: <StarIcon className="h-4 w-4 text-white"/>,
        //     name: 'Đánh giá',
        //     href: '/admin/review'
        // },
        {
            icon: <Squares2X2Icon className="h-4 w-4 text-black"/>,
            activeIcon: <Squares2X2Icon className="h-4 w-4 text-white"/>,
            name: 'Phòng',
            href: '/admin/room'
        },
        {
            icon: <TvIcon className="h-4 w-4 text-black"/>,
            activeIcon: <TvIcon className="h-4 w-4 text-white"/>,
            name: 'Thiết bị',
            href: '/admin/equipment'
        },
        {
            icon: <UserIcon className="h-4 w-4 text-black"/>,
            activeIcon: <UserIcon className="h-4 w-4 text-white"/>,
            name: 'Người dùng',
            href: '/admin/user'
        },
    ])

    const openSidebar = () => {
        setMenuOpen(true);
    }

    const closeSidebar = () => {
        setMenuOpen(false);
    }

    return <>
        <div className={"flex relative"}>
            <AdminSideBar listTab={listTab} openSidebar={openSidebar} closeSidebar={closeSidebar} isMenuOpen={isMenuOpen}/>
            <AdminContent openSidebar={openSidebar}>
                {children}
            </AdminContent>
        </div>
    </>
}
