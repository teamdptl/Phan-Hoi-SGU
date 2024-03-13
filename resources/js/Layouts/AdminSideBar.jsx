import {Link, router} from "@inertiajs/react";
import {Divider} from "@tremor/react";
import {
    AdjustmentsHorizontalIcon,
    ArrowLeftStartOnRectangleIcon,
    BellIcon,
    WrenchIcon
} from "@heroicons/react/24/outline/index.js";
import {useState} from "react";

export default function ({isMenuOpen, closeSidebar, listTab}){
    const [activeTab, setActiveTab] = useState(location.href);

    const logout = () => {
        router.post(route('logout'));
    }

    return <>
        <div
            className={`lg:w-auto lg:h-auto lg:relative ${isMenuOpen ? 'fixed w-screen h-screen z-40 backdrop-blur-sm' : 'bg-gray-50'}`}
            onClick={closeSidebar}>
            <nav
                className={`flex-none w-60 h-screen lg:block lg:relative lg:shadow-md bg-white fixed top-0 left-0 z-50 shadow-lg ${isMenuOpen ? '' : 'hidden'}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className={"space-x-1 font-medium text-xl flex justify-center py-6"}>
                    <span className={"text-blue-600 "}>SGU</span>
                    <span>Phản hồi</span>
                </div>
                <div className={"flex flex-col justify-center gap-2 cursor-pointer"}>
                    {
                        listTab.map(({icon, activeIcon, name, href}) => (
                            <>
                                <Link href={href}>
                                    <div className={"h-10 flex select-none items-center flex-nowrap"}>
                                        {activeTab.includes(href) &&
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
                    {/*<div className={"h-10 flex items-center flex-nowrap"}>*/}
                    {/*    <div*/}
                    {/*        className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>*/}
                    {/*        <WrenchIcon className="h-4 w-4 text-black"/>*/}
                    {/*        Cài đặt*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Link href={route('profile.edit')}>
                        <div className={"h-10 flex items-center flex-nowrap"}>
                            <div
                                className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                                <AdjustmentsHorizontalIcon className="h-4 w-4 text-black"/>
                                Tài khoản
                            </div>
                        </div>
                    </Link>

                    <Link href={route('admin.notification')}>
                        <div className={"h-10 flex items-center flex-nowrap"}>
                            <div
                                className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                                <BellIcon className="h-4 w-4 text-black"/>
                                Thông báo
                            </div>
                        </div>
                    </Link>

                    <div className={"h-10 flex items-center flex-nowrap"}>
                        <div onClick={logout}
                             className={"w-full mx-4 py-2 px-4 flex items-center gap-2 hover:bg-blue-50 rounded-lg"}>
                            <ArrowLeftStartOnRectangleIcon className="h-4 w-4 text-black"/>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
}
