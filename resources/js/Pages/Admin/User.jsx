import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Flex, TextInput, Title, Button} from "@tremor/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {Pagination} from "@mui/material";
import { router, usePage} from "@inertiajs/react";

import {useContext, useEffect, useState} from "react";

import {
    BarsArrowDownIcon,
    ChevronDownIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/outline/index.js";
import { Link } from '@inertiajs/react';


import Checkbox from "@/Components/Checkbox.jsx";

export default function ({users, from, to, total, lastPage, currentPage, search}) {
    const [inputVal, setInputVal] = useState(search);
    
    
    useEffect(() => {
        // Khắc phục lỗi khi xóa trang có 1 items
        if (users.length === 0 && currentPage !== 1){
            router.get('', {search: search , page: 1});
        }
    }, [users, currentPage]);

    useEffect(() => {
        console.log("users", users);
        console.log("total", total); 
        console.log("from", from);
        console.log("to", to);
        console.log("lastPage", lastPage);
        console.log("currentPage", currentPage);
        console.log("search", search);

    }, [users]);

    const changePage = (pageNum) => {
        router.get('', {search: search, page: pageNum});

    }

    const searchData = (searchText) => {
        router.get('', {search: searchText , page: 1});
    }
    
    return <>
        <AdminLayout>
            <Flex justifyContent={"between"} className={"mb-4"}>
                <Title>Quản lý người dùng</Title>
            </Flex>
            <div className="mx-auto max-w-screen-7xl">
                {/* Start coding here */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                        <div className={"relative"}>
                                <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24 pr-2"} value={inputVal}
                                           placeholder="Tìm người dùng" onChange={(e) => {
                                    setInputVal(e.target.value)
                                }}
                                />
                                {
                                    search && (
                                        <Button onClick={() => searchData("")} className={"absolute right-2 top-1/2 -translate-y-1/2"} icon={XMarkIcon} size={"xs"} variant={"light"} color={"gray"}/>
                                    )
                                }
                            </div>

                            <Button onClick={() => searchData(inputVal)} size={"xs"}>Tìm kiếm</Button>

                        </div>
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link href={"/admin/user/add"} method="get">
                            <Button size={"xs"} icon={PlusIcon}>Thêm người dùng</Button>
                            </Link>
                            <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3 w-full md:w-auto">
                                <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                                <Button size={"xs"} icon={BarsArrowDownIcon} variant={"secondary"}>Sắp xếp</Button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <td className={"pl-4"}>
                                    <Checkbox/>
                                </td>
                                <th scope="col" className="px-4 py-4">
                                    Tên người dùng
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Vai trò
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tình trạng
                                </th>
                                <th scope="col" className="px-4 py-3 text-center">
                                    <span className="sr-only">Hành động</span>
                                    Hành động
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                users.length > 0 && users.map(user => (
                                <tr className="border-b dark:border-gray-700 cursor-pointer">
                                <td className={"pl-4"}>
                                    <Checkbox/>
                                </td>
                                <th
                                    scope="row"
                                    className="truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-4 py-3 truncate">{user.roles[0].name}</td>
                                <td className="px-4 py-3 truncate">{user.email}</td>
                                <td className="px-4 py-3 truncate">
                                {user.status ? 'Hoạt động' : 'Không hoạt động'}
                                </td>
                                <td className="px-4 py-3 flex items-center justify-center space-x-4">
                                    <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                            color={"yellow"}>Sửa</Button>
                                    <Button size={"xs"} icon={TrashIcon} color={"red"} variant={"light"}>Xóa</Button>
                                </td>
                            </tr>
                             ))
                                }
                             {
                                users.length === 0 && (
                                    <>
                                        <tr>
                                            <td colSpan={6} className={"text-center py-2"}>
                                                Không tìm thấy người dùng nào
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <nav
                        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation"
                    >
                                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Hiển thị {" "}
                                        {
                                             from !== null && to !== null && (
                                                 <>
                                                      <span className="font-semibold text-gray-900 dark:text-white">
                                                        {from} - {to} {" "}
                                                      </span>
                                                     trong {" "}
                                                 </>
                                             )
                                         }
                                         <span className="font-semibold text-gray-900 dark:text-white">
                                            {total} người dùng
                                        </span>
                                    </span>
                                    {lastPage > 1 && (
                            <div className="inline-flex items-stretch -space-x-px">
                                <Pagination onChange={(e, num) => {
                                    changePage(num)
                                }} page={currentPage} count={lastPage} color="primary"/>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </AdminLayout>
    </>
}
