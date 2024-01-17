import {Button, Divider, Flex, TextInput} from "@tremor/react";
import {BellIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {
    ArrowLeftStartOnRectangleIcon, Bars3Icon,
    ChartBarIcon,
    ChatBubbleBottomCenterTextIcon,
    Squares2X2Icon, StarIcon,
    TvIcon,
    UserIcon, WrenchIcon
} from '@heroicons/react/24/outline'
import Dropdown from "@/Components/Dropdown.jsx";
import {useEffect, useState} from "react";

export default function AdminLayout({children}){
    const [activeTab, setActiveTab] = useState('/admin/dashboard');
    const [isCollapseMenu, setCollapseMenu] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem('isCollapseMenu');
        if (value){
            setCollapseMenu(value === 'true');
        }
    }, []);

    const [listTab, setListTab] = useState([
        {
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            activeIcon: <ChartBarIcon className="h-4 w-4 text-white"/>,
            name: 'Bảng điều khiển',
            href: '/admin/dashboard'
        },
        {
            icon: <Squares2X2Icon className="h-4 w-4 text-black"/>,
            activeIcon: <Squares2X2Icon className="h-4 w-4 text-white"/>,
            name: 'Phòng',
            href: '/admin/rooms'
        },
        {
            icon: <TvIcon className="h-4 w-4 text-black"/>,
            activeIcon: <TvIcon className="h-4 w-4 text-white"/>,
            name: 'Thiết bị',
            href: '/admin/equipments'
        },
        {
            icon: <UserIcon className="h-4 w-4 text-black"/>,
            activeIcon: <UserIcon className="h-4 w-4 text-white"/>,
            name: 'Người dùng',
            href: '/admin/users'
        },
        {
            icon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-black"/>,
            activeIcon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-white"/>,
            name: 'Báo hỏng',
            href: '/admin/reports'
        },
        {
            icon: <StarIcon className="h-4 w-4 text-black"/>,
            activeIcon: <StarIcon className="h-4 w-4 text-white"/>,
            name: 'Đánh giá',
            href: '/admin/reviews'
        },
    ])

    const collapseMenu = () => {
        setCollapseMenu(!isCollapseMenu);
        localStorage.setItem('isCollapseMenu', (!isCollapseMenu).toString());
    }



    return <>
        <div className={"flex"}>
            <nav className={"flex-initial w-60 h-screen"}>
                <div className={"space-x-1 font-medium text-xl flex justify-center py-6"}>
                    <span className={"text-blue-600 "}>SGU</span>
                    <span>Phản hồi</span>
                </div>
                <div className={"flex flex-col justify-center gap-2 cursor-pointer"}>
                    {
                        listTab.map(({ icon, activeIcon, name, href }) => (
                            <>
                                <div className={"h-10 flex items-center flex-nowrap"}>
                                    {activeTab === href &&
                                        (
                                            <>
                                                <div className="bg-blue-500 w-1.5 h-full rounded-r-lg"></div>
                                                <div className={"bg-blue-500 w-full mx-4 py-2 px-4 text-white rounded-lg flex items-center gap-2"}>
                                                    {activeIcon}
                                                    {name}
                                                </div>
                                            </>
                                        )
                                    }

                                    {activeTab !== href && (
                                        <div className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                                            {icon}
                                            {name}
                                        </div>
                                    )}
                                </div>
                            </>
                        ))

                    }
                </div>
                <Divider className={"my-4"}/>
                <div className={"flex flex-col justify-center gap-2 cursor-pointer"}>
                    <div className={"h-10 flex items-center flex-nowrap"}>
                        <div className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                            <WrenchIcon className="h-4 w-4 text-black"/>
                            Cài đặt
                        </div>
                    </div>
                    <div className={"h-10 flex items-center flex-nowrap"}>
                        <div className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                            <ArrowLeftStartOnRectangleIcon className="h-4 w-4 text-black"/>
                            Đăng xuất
                        </div>
                    </div>
                </div>

            </nav>
            <div className={"w-full"}>
                <header className={"flex justify-between my-2"}>
                    <div className={"space-x-4 flex items-center"}>
                        <Button icon={Bars3Icon} variant={"light"} color={"black"} onClick={collapseMenu}></Button>
                        <TextInput className={"w-64"} icon={MagnifyingGlassIcon} placeholder="Tìm kiếm chức năng" />
                        <Button icon={MagnifyingGlassIcon} size="xs">Tìm kiếm</Button>
                    </div>
                    <div className={"flex items-center justify-center space-x-4 mr-2"}>
                        <BellIcon className="h-4 w-4 text-blue-600"/>
                        <Dropdown className={"w-12"}>
                            <Dropdown.Trigger>
                                Duy Huỳnh
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link>Đổi mật khẩu</Dropdown.Link>
                                <Dropdown.Link>Đăng xuất</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>
                <content>
                    {children}
                </content>
            </div>
        </div>
    </>
}
