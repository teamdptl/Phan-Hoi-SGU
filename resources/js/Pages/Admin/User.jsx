import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Flex, TextInput, Title, Button} from "@tremor/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {Pagination} from "@mui/material";
import { router, usePage} from "@inertiajs/react";
import Swal from "sweetalert2";
import Dropdown from "@/Components/Dropdown.jsx";

import {useContext, useEffect, useState} from "react";

import {
    BarsArrowDownIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
    ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon,

} from "@heroicons/react/24/outline/index.js";
import { Link } from '@inertiajs/react';


import Checkbox from "@/Components/Checkbox.jsx";

export default function ({users, from, to, total, lastPage, currentPage, search, sortColumn, sortType}) {
    const { message, error } = usePage().props.flash;
    const [inputVal, setInputVal] = useState(search);
    const [checkBoxes, setCheckboxes] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    const tableHeader = [
        { title: 'Tên người dùng', key: 'name' },
        { title: 'Vai trò', key: 'role' },
        { title: 'Email', key: 'email' },
        { title: 'Status', key: 'status' },
    ];

    const changeSort = (headerKey) => {
        if (headerKey === sortColumn){
            if (!sortType || sortType === 'asc'){
                router.get('', {sortColumn: headerKey, sortType: 'desc'})
            }
            else {
                router.get('', {sortColumn: headerKey, sortType: 'asc'})
            }
        }
        else {
            router.get('', {sortColumn: headerKey, sortType: 'desc'})
        }
    }

    useEffect(() => {
        if (message){
            Swal.fire({
                text: message,
                title: "Thành công",
                icon: "success"
            })
        }
    }, [message]);

    useEffect(() => {
        if (error){
            Swal.fire({
                text: error,
                title: "Thất bại",
                icon: "error"
            })
        }
    }, [error]);

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
        router.get('', {search: searchText , page: 1, sortColumn: '', sortType: ''});
    }
    
    const deleteConfirm = (id, header, content) => {
        Swal.fire({
            title: header,
            text: content,
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Có",
            denyButtonText: "Không"
        }).then((result) => {
            if (result.isConfirmed){
                router.delete(route('admin.user') + `/${id}`);
            }
        })
    }

    const toggleAllCheckbox = () => {
        if (!allChecked){
            setCheckboxes(users.map(user => user.id))
            setAllChecked(true);
        }
        else {
            setCheckboxes([])
            setAllChecked(false);
        }
    }

    const deleteMutipleConfirm = () => {
        Swal.fire({
            title: "Xóa thiết bị",
            text: "Bạn có muốn xóa các thiết bị đã chọn ?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Có",
            denyButtonText: "Không"
        }).then((result) => {
            if (result.isConfirmed){
                if (checkBoxes.length === 0){
                    Swal.fire({
                        text: "Bạn chưa chọn bất kì thiết bị nào để xóa",
                        title: "Không thể thực hiện",
                        icon: "warning"
                    })
                    return;
                }
                router.visit(route('admin.user') + `/list`, {
                    data: {
                        items: checkBoxes,
                    },
                    method: 'delete'
                });
            }
        })
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
                            <Dropdown>
                                    <Dropdown.Trigger>
                                        <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} onClick={deleteMutipleConfirm} preserveState>
                                            <TrashIcon className={"h-4 w-4"}/>
                                            <p>Xóa thiết bị đã chọn</p>
                                        </Dropdown.Link>
                                        </Dropdown.Content>
                                </Dropdown>
                                {/* <Button size={"xs"} icon={BarsArrowDownIcon} variant={"secondary"}>Sắp xếp</Button> */}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <td className={"pl-4"}>
                                <Checkbox checked={allChecked} onClick={toggleAllCheckbox}/>
                                </td>
                                {
                                    tableHeader.map(item => (
                                        <th scope="col" className="px-4 py-4 cursor-pointer"  onClick={() => changeSort(item.key)}>
                                          <span className={"flex truncate space-x-2 items-center"}>
                                                <p>{item.title}</p>
                                                {item.key !== sortColumn && (
                                                    <ChevronUpDownIcon className={"w-4 h-4"}/>
                                                )}

                                                {item.key === sortColumn && sortType === 'asc' && (
                                                    <ChevronUpIcon className={"w-3 h-3"}/>
                                                )}

                                                {item.key === sortColumn && sortType === 'desc' && (
                                                    <ChevronDownIcon className={"w-3 h-3"}/>
                                                )}
                                            </span>
                                        </th>

                                    ))
                                }
                                {/* <th scope="col" className="px-4 py-4">
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
                                </th> */}
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
                                <Checkbox checked={checkBoxes.includes(user.id)} onClick={() => {
                                                if (checkBoxes.includes(user.id)) {
                                                    setCheckboxes(checkBoxes.filter(item => item !== user.id));
                                                }
                                                else {
                                                    setCheckboxes([...checkBoxes, user.id]);
                                                }
                                            }}  disabled={user.status === 0}/>
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
                                <Link href={route('admin.user')+`/update/${user.id}`}>
                                    <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                            color={"yellow"}>Sửa</Button>
                                </Link>     
                                    <Button  onClick={() => deleteConfirm(user.id, 'Xóa người dùng', 'Bạn có muốn xóa người dùng '+user.name+' ?')} size={"xs"} icon={TrashIcon} color={"red"} variant={"light"}>Xóa</Button>
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
