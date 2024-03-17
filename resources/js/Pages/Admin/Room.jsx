import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import {
    Title,
    Flex,
    Button, TextInput, Select, SelectItem,
} from "@tremor/react";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon, EyeIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline/index.js";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {
    ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon,
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import Checkbox from "@/Components/Checkbox.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import {Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {facilityToString} from "@/Utils/facility.js";

export default function Room({rooms, coSo, search, from, to, lastPage, total, currentPage, sortColumn, sortType}){
    const [inputVal, setInputVal] = useState(search);
    const [coSoTruong, setCoSoTruong] = useState(coSo);
    const { flash } = usePage().props;
    const [checkBoxes, setCheckboxes] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    const tableHeader = [
        { title: 'Mã phòng', key: 'name' },
        { title: 'Cơ sở', key: 'facility' },
        { title: 'Chức năng', key: 'type' },
        { title: 'Đánh giá', key: 'average_rating' },
        { title: 'Báo hỏng', key: 'sent_reports' }
    ];

    useEffect(() => {
        if (flash.message){
            Swal.fire({
                text: flash.message,
                title: "Thành công",
                icon: "success"
            })
        }
        else if (flash.error){
            Swal.fire({
                text: flash.error,
                title: "Thất bại",
                icon: "error"
            })
        }
    }, [flash]);

    const searchData = (searchText) => {
        router.get('', {search: searchText , page: 1, sortColumn: '', sortType: ''});
    }

    const searchFacility = (coSoTruongHoc) => {
        setCoSoTruong(coSoTruongHoc);
        router.get('', {coSo: coSoTruongHoc, page: 1, sortColumn: '', sortType: ''});
    }

    const changePage = (num) => {
        router.get('', {page: num})
    }

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
                router.delete(route('admin.room') + `/${id}`);
            }
        })
    }

    const toggleAllCheckbox = () => {
        if (!allChecked){
            setCheckboxes(rooms.map(equip => equip.id))
            setAllChecked(true);
        }
        else {
            setCheckboxes([])
            setAllChecked(false);
        }
    }

    const deleteMutipleConfirm = () => {
        Swal.fire({
            title: "Xóa các phòng",
            text: "Bạn có muốn xóa các phòng đã chọn ?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Có",
            denyButtonText: "Không"
        }).then((result) => {
            if (result.isConfirmed){
                if (checkBoxes.length === 0){
                    Swal.fire({
                        text: "Bạn chưa chọn bất kì phòng nào để xóa",
                        title: "Không thể thực hiện",
                        icon: "warning"
                    })
                    return;
                }
                router.visit(route('admin.room') + `/list`, {
                    data: {
                        items: checkBoxes,
                    },
                    method: 'delete'
                });
            }
        })
    }

    return <>
        <AdminLayout title={"Quản lý phòng"}>
            <Flex justifyContent={"between"} className={"mb-4"}>
                <Title>Quản lý phòng</Title>
            </Flex>
            <div className="mx-auto max-w-screen-7xl">
                {/*<div className={"fixed bottom-0 right-0 z-50"}>*/}
                {/*    Hello world*/}
                {/*</div>*/}
                {/* Start coding here */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                            <div className={"relative"}>
                                <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-28 pr-2"}
                                           value={inputVal}
                                           placeholder="Tìm phòng" onChange={(e) => {
                                    setInputVal(e.target.value)
                                }}
                                />
                                {
                                    search && (
                                        <Button onClick={() => searchData("")}
                                                className={"absolute right-2 top-1/2 -translate-y-1/2"} icon={XMarkIcon}
                                                size={"xs"} variant={"light"} color={"gray"}/>
                                    )
                                }
                            </div>
                            <select className="max-w-32 border-tremor-border bg-light border rounded-tremor-default text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={coSoTruong}
                                    onChange={(e) => searchFacility(e.target.value)}
                            >
                                <option selected value="">Tất cả</option>
                                <option value="c">Cơ sở chính</option>
                                <option value="1">Cơ sở 1</option>
                                <option value="2">Cơ sở 2</option>
                            </select>
                            <Button size={"xs"} onClick={() => searchData(inputVal)}>Tìm kiếm</Button>
                        </div>
                        <div
                            className="w-full md:w-auto flex flex-row space-x-3 items-stretch md:items-center justify-start flex-shrink-0">
                            <Link href={"/admin/room/add"}>
                                <Button size={"xs"} icon={PlusIcon}>Thêm phòng</Button>
                            </Link>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} onClick={deleteMutipleConfirm} preserveState>
                                        <TrashIcon className={"h-4 w-4"}/>
                                        <p>Xóa phòng đã chọn</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"}
                                                   preserveState>
                                        <ArrowUpTrayIcon className={"h-4 w-4"}/>
                                        <p>Nhập file excel</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"}
                                                   preserveState>
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
                                <th className={"pl-4"}>
                                    <Checkbox checked={allChecked} onClick={toggleAllCheckbox}/>
                                </th>
                                {
                                    tableHeader.map(item => (
                                        <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => changeSort(item.key)}>
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
                                <th scope="col" className="px-4 py-3 text-center">
                                    <span className="sr-only">Hành động</span>
                                    Hành động
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                rooms.length > 0 && rooms.map((room) => (
                                    <>
                                        <tr key={room.id} className="border-b dark:border-gray-700">
                                            <td className={"pl-4"}>
                                                <Checkbox checked={checkBoxes.includes(room.id)} onClick={() => {
                                                    if (checkBoxes.includes(room.id)) {
                                                        setCheckboxes(checkBoxes.filter(item => item !== room.id));
                                                    }
                                                    else {
                                                        setCheckboxes([...checkBoxes, room.id]);
                                                    }
                                                }}/>
                                            </td>
                                            <th
                                                scope="row"
                                                className="truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {room.name}
                                            </th>
                                            <td className="px-4 py-3 truncate">{facilityToString(room.facility)}</td>
                                            <td className="px-4 py-3 truncate">{room.type}</td>
                                            <td className="px-4 py-3 truncate">
                                                { room.average_rating !== null && (
                                                    <>
                                                        { parseFloat(room.average_rating).toFixed(1) } /5
                                                        ({room.total_ratings} lượt)
                                                    </>
                                                )}
                                                {
                                                    room.average_rating === null && "Chưa có"
                                                }
                                            </td>
                                            <td className="px-4 py-3 truncate">
                                                {room.sent_reports} chưa xử lý
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-center space-x-4">
                                                <Link href={route('admin.room') + `/${room.id}`}>
                                                    <Button size={"xs"} icon={EyeIcon} variant={"light"}>Chi tiết</Button>
                                                </Link>
                                                <Link href={route('admin.room') + `/update/${room.id}`}>
                                                    <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                                            color={"yellow"}>Sửa</Button>
                                                </Link>

                                                <Button size={"xs"} icon={TrashIcon} color={"red"}
                                                        variant={"light"} onClick={() => deleteConfirm(room.id, 'Xóa phòng', `Bạn có muốn xóa phòng ${room.name}?`)}>Xóa</Button>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }

                            {
                                rooms.length === 0 && (
                                    <>
                                        <tr>
                                            <td colSpan={6} className={"text-center py-2"}>
                                                Không tìm thấy phòng nào
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
                                            {total} phòng
                                        </span>
                                    </span>
                        {lastPage > 1 && (
                            <div className="inline-flex items-stretch -space-x-px">
                                <Pagination page={currentPage} count={lastPage} onChange={(e, newPage) => changePage(newPage)} color="primary"/>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </AdminLayout>
    </>
}


