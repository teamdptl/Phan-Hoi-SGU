import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, Flex, TextInput, Title} from "@tremor/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {
    ArrowDownTrayIcon, ArrowUpTrayIcon,
    ChevronDownIcon, EyeIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon, XMarkIcon
} from "@heroicons/react/24/outline/index.js";
import Checkbox from "@/Components/Checkbox.jsx";
import {Pagination} from "@mui/material";
import {Link, router, usePage} from "@inertiajs/react";
import {useContext, useEffect, useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";
import Swal from "sweetalert2";

export default function ({equipments, from, to, total, lastPage, currentPage, search}){
    const { message, error } = usePage().props.flash;
    const [inputVal, setInputVal] = useState(search);
    const [checkBoxes, setCheckboxes] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

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
        if (equipments.length === 0 && currentPage !== 1){
            router.get('', {search: search , page: 1});
        }
    }, [equipments, currentPage]);

    const searchData = (searchText) => {
        router.get('', {search: searchText , page: 1});
    }

    const changePage = (pageNum) => {
        router.get('', {search: search, page: pageNum})
    }

    const toggleAllCheckbox = () => {
        if (!allChecked){
            setCheckboxes(equipments.map(equip => equip.id))
            setAllChecked(true);
        }
        else {
            setCheckboxes([])
            setAllChecked(false);
        }
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
                router.delete(route('admin.equipment') + `/${id}`);
            }
        })
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
                router.visit(route('admin.equipment') + `/list`, {
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
                <Title>Quản lý thiết bị</Title>
            </Flex>
            <div className="mx-auto max-w-screen-7xl">
                {/* Start coding here */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                            <div className={"relative"}>
                                <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24 pr-2"} value={inputVal}
                                           placeholder="Tìm thiết bị" onChange={(e) => {
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
                            className="w-full md:w-auto flex flex-row space-x-3 items-stretch md:items-center justify-start flex-shrink-0">
                            <Link href={"/admin/equipment/add"}>
                                <Button size={"xs"} icon={PlusIcon}>Thêm thiết bị</Button>
                            </Link>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} onClick={deleteMutipleConfirm} preserveState>
                                            <TrashIcon className={"h-4 w-4"}/>
                                            <p>Xóa thiết bị đã chọn</p>
                                        </Dropdown.Link>
                                        <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} preserveState>
                                            <ArrowUpTrayIcon className={"h-4 w-4"}/>
                                            <p>Nhập file excel</p>
                                        </Dropdown.Link>
                                        <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} preserveState>
                                            <ArrowDownTrayIcon className={"h-4 w-4"}/>
                                            <p>Xuất file excel</p>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <td className={"px-4"}>
                                    <Checkbox checked={allChecked} onClick={toggleAllCheckbox}/>
                                </td>
                                <th scope="col" className="px-4 py-4 text-center lg:text-left cursor-pointer select-none w-8">
                                    Hình
                                </th>
                                <th scope="col" className="px-4 py-3 cursor-pointer select-none">
                                    Tên
                                </th>
                                <th scope="col" className="px-4 py-3 cursor-pointer select-none text-ellipsis">
                                    Mô tả
                                </th>
                                <th scope="col" className="px-4 py-3 cursor-pointer select-none">
                                    Thể loại
                                </th>
                                <th scope="col" className="px-4 py-3 text-center">
                                    <span className="sr-only">Hành động</span>
                                    Hành động
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                equipments.length > 0 && equipments.map(equip => (
                                    <tr className="border-b dark:border-gray-700">
                                        <td className={"px-4 w-4"}>
                                            <Checkbox checked={checkBoxes.includes(equip.id)} onClick={() => {
                                                if (checkBoxes.includes(equip.id)) {
                                                    setCheckboxes(checkBoxes.filter(item => item !== equip.id));
                                                }
                                                else {
                                                    setCheckboxes([...checkBoxes, equip.id]);
                                                }
                                            }}/>
                                        </td>
                                        <td className={"flex items-center justify-center py-2 w-12"}>
                                            <img className={"w-8 h-8"} src={equip.icon}/>
                                        </td>
                                        <td className="px-4 py-3 truncate">{equip.name}</td>
                                        <td className="px-4 py-3 text-ellipsis">{equip.description}</td>
                                        <td className="px-4 py-3 truncate">
                                            {equip.type.name}
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-center space-x-4">
                                            <Link href={route('admin.equipment')+`/${equip.id}`}>
                                                <Button size={"xs"} icon={EyeIcon} variant={"light"}>Chi tiết</Button>
                                            </Link>
                                            <Link href={route('admin.equipment')+`/update/${equip.id}`}>
                                                <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                                        color={"yellow"}>Sửa</Button>
                                            </Link>
                                            <Button size={"xs"} icon={TrashIcon} color={"red"}
                                                    onClick={() => deleteConfirm(equip.id, 'Xóa thiết bị', 'Bạn có muốn xóa thiết bị '+equip.name+' ?')}
                                                    variant={"light"}>Xóa</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                equipments.length === 0 && (
                                    <>
                                        <tr>
                                            <td colSpan={6} className={"text-center py-2"}>
                                                Không tìm thấy thiết bị nào
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
                        aria-label="Table navigation">
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
                                            {total} thiết bị
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
