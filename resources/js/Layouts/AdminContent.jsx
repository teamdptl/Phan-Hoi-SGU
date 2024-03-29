import {Button, Flex, TextInput} from "@tremor/react";
import {Bars3Icon, BellIcon, ChevronDownIcon} from "@heroicons/react/24/outline/index.js";
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid/index.js";
import Dropdown from "@/Components/Dropdown.jsx";
import {Link, router, usePage} from "@inertiajs/react";

export default function({children, openSidebar}){
    const {auth} = usePage().props;

    const logout = () => {
        router.post(route('logout'));
    }

    return <>
        <div className={"w-full min-h-screen bg-gray-50"}>
            <header className={"bg-white justify-between py-2 px-4 flex space-x-2 shadow-sm"}>
                <div className={"space-x-4 flex items-center"}>
                    <Button className={"inline-flex lg:hidden"} icon={Bars3Icon} variant={"light"} color={"gray"}
                            onClick={openSidebar}></Button>
                    <TextInput className={"max-w-64"} icon={MagnifyingGlassIcon} placeholder="Tìm kiếm chức năng"/>
                </div>
                <div className={"flex items-center justify-center space-x-4 mr-2"}>
                    <Link href={route('admin.notification')}>
                        <BellIcon className="h-6 w-6 text-blue-600 cursor-pointer"/>
                    </Link>

                    {auth.user !== null && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Flex className={"gap-1 border-gray-100 cursor-pointer px-2 rounded-lg"}>
                                    <UserCircleIcon class={"h-10 w-10 md:h-12 md:w-12 text-gray-500"}/>
                                    <Flex className={"hidden md:flex"} flexDirection={"col"} justifyContent={"start"}
                                          alignItems={"start"}>
                                        <p>
                                            {auth.user.name}
                                        </p>
                                        <p className={"text-xs"}>
                                            Quản trị viên
                                        </p>
                                    </Flex>
                                    <ChevronDownIcon className={"h-4 w-4 md:h-6 md:w-6"}/>
                                </Flex>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Thông tin cá nhân</Dropdown.Link>
                                <Dropdown.Link href="/logout" method="post">Đăng xuất</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
            </header>
            <content className={""}>
                <div className={"p-4 md:p-5"}>
                    {children}
                </div>
            </content>
        </div>
    </>
}
