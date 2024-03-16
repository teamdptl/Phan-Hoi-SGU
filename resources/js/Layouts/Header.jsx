import {useState} from "react";
import {Link, usePage} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";
import {ADMIN, WORKER} from "@/Utils/role.js";
import { getCurrentUrlRedirect } from "@/Utils/login";

export default function Header(){
    const [navToggle, setNavToggle] = useState(false);
    const { auth } = usePage().props;

    const toggleNav = () => {
        setNavToggle(!navToggle);
    }
    console.log(auth);

    return <>
        <header className={`${navToggle ? 'pb-6' : 'pb-0'} bg-gray-50 lg:pb-0 shadow-md`}>
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <nav className="flex items-center justify-between h-20 lg:h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" title="" className="flex">
                            <img className="w-auto h-14 lg:h-16" src="/logo.png" alt="" />
                        </Link>
                    </div>

                    <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        onClick={toggleNav}
                    >

                        <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>


                        <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Hướng dẫn </a>

                        <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Liên hệ </a>
                    </div>

                    {
                        auth.user !== null && (
                            <>
                                <Dropdown className={"hidden lg:block"}>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md ml-10">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {
                                            auth.role !== null && auth.role.find(item => item.id === ADMIN) !== undefined && (
                                                <Dropdown.Link href={route('admin.dashboard')}>Trang quản lý</Dropdown.Link>
                                            )
                                        }

                                        {
                                            auth.role !== null && auth.role.find(item => item.id === WORKER) !== undefined && (
                                                <Dropdown.Link href={route('worker.home')}>Danh sách việc</Dropdown.Link>
                                            )
                                        }

                                        <Dropdown.Link href={route('profile.edit')}>Thông tin cá nhân</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Đăng xuất
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </>
                        )
                    }

                    {auth.user === null && (
                        <>
                            <Link href={"/login?redirect=" + getCurrentUrlRedirect()} title="" className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button"> Đăng nhập </Link>
                        </>
                    )}
                </nav>

                {navToggle &&
                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Hướng dẫn </a>

                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Liên hệ </a>
                            </div>
                        </div>

                        {auth.user === null && (
                            <div className="px-6 mt-6">
                                <Link href={"/login?redirect=" + getCurrentUrlRedirect()} title=""
                                      className="inline-flex justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
                                      role="button"> Đăng nhập </Link>
                            </div>
                        )}

                        {
                            auth.user !== null && (
                                <>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md px-6 mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {
                                                auth.role !== null && auth.role.find(item => item.id === ADMIN) !== undefined && (
                                                    <Dropdown.Link href={route('admin.dashboard')}>Trang quản lý</Dropdown.Link>
                                                )
                                            }

                                            {
                                                auth.role !== null && auth.role.find(item => item.id === WORKER) !== undefined && (
                                                    <Dropdown.Link href={route('worker.home')}>Danh sách việc</Dropdown.Link>
                                                )
                                            }

                                            <Dropdown.Link href={route('profile.edit')}>Thông tin cá nhân</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Đăng xuất
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </>
                            )
                        }

                    </nav>
                }
            </div>
        </header>
    </>
}
