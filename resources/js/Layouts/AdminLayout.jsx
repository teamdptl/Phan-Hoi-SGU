import {Button, Divider, Flex, Grid, TextInput} from "@tremor/react";
import {MagnifyingGlassIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {
    ArrowLeftStartOnRectangleIcon, Bars3Icon,
    ChartBarIcon,
    ChatBubbleBottomCenterTextIcon,
    Squares2X2Icon, StarIcon,
    TvIcon, WrenchIcon, UserIcon, ChevronDownIcon,
    BellIcon, AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import Dropdown from "@/Components/Dropdown.jsx";
import {useEffect, useState} from "react";
import {Link, router} from "@inertiajs/react";

export default function AdminLayout({children}){
    const [activeTab, setActiveTab] = useState(location.href);
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
            icon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-black"/>,
            activeIcon: <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-white"/>,
            name: 'Báo hỏng',
            href: '/admin/report'
        },
        {
            icon: <StarIcon className="h-4 w-4 text-black"/>,
            activeIcon: <StarIcon className="h-4 w-4 text-white"/>,
            name: 'Đánh giá',
            href: '/admin/review'
        },
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
                                <Link href={href}>
                                    <div className={"h-10 flex select-none items-center flex-nowrap"}>
                                        {activeTab.includes(href)  &&
                                            (
                                                <>
                                                    <div className="bg-blue-500 w-1.5 h-full rounded-r-lg"></div>
                                                    <div
                                                        className={"bg-blue-500 w-full mx-4 py-2 px-4 text-white rounded-lg flex items-center gap-2"}>
                                                        {activeIcon}
                                                        {name}
                                                    </div>
                                                </>
                                            )
                                        }

                                        {!activeTab.includes(href) && (
                                            <div
                                                className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                                                {icon}
                                                {name}
                                            </div>
                                        )}
                                    </div>
                                </Link>

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
                            <AdjustmentsHorizontalIcon className="h-4 w-4 text-black"/>
                            Tài khoản
                        </div>
                    </div>
                    <div className={"h-10 flex items-center flex-nowrap"}>
                        <div className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                            <BellIcon className="h-4 w-4 text-black"/>
                            Thông báo
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
            <div className={"w-full bg-gray-50"}>
                <header className={"bg-white justify-between py-2 px-4 hidden lg:flex"}>
                    <div className={"space-x-4 flex items-center"}>
                        <Button icon={Bars3Icon} variant={"light"} color={"black"} onClick={collapseMenu}></Button>
                        <TextInput className={"w-64"} icon={MagnifyingGlassIcon} placeholder="Tìm kiếm chức năng"/>
                    </div>
                    <div className={"flex items-center justify-center space-x-4 mr-2"}>
                        <BellIcon className="h-6 w-6 text-blue-600 cursor-pointer"/>
                        <Dropdown className={"w-12"}>
                            <Dropdown.Trigger>
                                <Flex className={"gap-1 border-gray-100 cursor-pointer px-2 rounded-lg"}>
                                    <UserCircleIcon class={"h-12 w-12 text-gray-500"}/>
                                    <Flex flexDirection={"col"} justifyContent={"start"} alignItems={"start"}>
                                        <p>
                                            Huỳnh Khánh Duy
                                        </p>
                                        <p className={"text-xs"}>
                                            Quản trị viên
                                        </p>
                                    </Flex>
                                    <ChevronDownIcon className={"h-6 w-6"}/>
                                </Flex>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link>Đổi mật khẩu</Dropdown.Link>
                                <Dropdown.Link>Đăng xuất</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>
                {/*<content className={"w-full h-full"}>*/}
                <content className={""}>
                    {children}
                </content>
            </div>
        </div>
    </>
}
