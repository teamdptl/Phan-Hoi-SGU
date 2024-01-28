import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, Flex, TextInput, Title} from "@tremor/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {
    BarsArrowDownIcon,
    ChevronDownIcon, EyeIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon
} from "@heroicons/react/24/outline/index.js";
import Checkbox from "@/Components/Checkbox.jsx";
import {Pagination} from "@mui/material";
import {Link, router} from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function ({equipments, from, to, total, lastPage, currentPage, search}){
    const [inputVal, setInputVal] = useState(search);
    const [checkBoxes, setCheckboxes] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    // const [filterData, setFilterData] = useState({
    //     search: search,
    //     page: currentPage
    // });

    const searchData = () => {
        router.get('', {search: inputVal , page: 1});
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
                            <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24"} value={inputVal}
                                       placeholder="Tìm thiết bị" onChange={(e) => {
                                setInputVal(e.target.value)
                            }}
                            />
                            {/*<Button onClick={}/>*/}
                            <Button onClick={searchData} size={"xs"}>Tìm kiếm</Button>
                        </div>
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link href={"/admin/equipment/add"}>
                                <Button size={"xs"} icon={PlusIcon}>Thêm thiết bị</Button>
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
                                <td className={"px-3"}>
                                    <Checkbox checked={allChecked} onClick={toggleAllCheckbox}/>
                                </td>
                                <th scope="col" className="px-4 py-4 text-center lg:text-left">
                                    Hình
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Tên
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Mô tả
                                </th>
                                <th scope="col" className="px-4 py-3">
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
                                        <td className={"px-3"}>
                                            <Checkbox checked={checkBoxes.includes(equip.id)} onClick={() => {
                                                if (checkBoxes.includes(equip.id)) {
                                                    setCheckboxes(checkBoxes.filter(item => item !== equip.id));
                                                }
                                                else {
                                                    setCheckboxes([...checkBoxes, equip.id]);
                                                }
                                            }}/>
                                        </td>
                                        <td className={"flex items-center justify-center lg:justify-start py-2"}>
                                            <img className={"w-8 h-8"} src={"/logo.png"}/>
                                        </td>
                                        <td className="px-4 py-3 truncate">{equip.name}</td>
                                        <td className="px-4 py-3 truncate">{equip.description}</td>
                                        <td className="px-4 py-3 truncate">
                                            Thiết bị gia dụng
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-center space-x-4">
                                            <Button size={"xs"} icon={EyeIcon} variant={"light"}>Chi tiết</Button>
                                            <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                                    color={"yellow"}>Sửa</Button>
                                            <Button size={"xs"} icon={TrashIcon} color={"red"}
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
                                                Chưa có thiết bị nào
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
