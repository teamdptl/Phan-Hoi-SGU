import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Flex, TextInput, Title, Button} from "@tremor/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {
    BarsArrowDownIcon,
    ChevronDownIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon
} from "@heroicons/react/24/outline/index.js";
import Checkbox from "@/Components/Checkbox.jsx";

export default function (){
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
                            <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24"}
                                       placeholder="Tìm người dùng"/>
                            <Button size={"xs"}>Tìm kiếm</Button>
                        </div>
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Button size={"xs"} icon={PlusIcon}>Thêm người dùng</Button>
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
                            <tr className="border-b dark:border-gray-700 cursor-pointer">
                                <td className={"pl-4"}>
                                    <Checkbox/>
                                </td>
                                <th
                                    scope="row"
                                    className="truncate px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Huỳnh Khánh Duy
                                </th>
                                <td className="px-4 py-3 truncate">Quản trị viên</td>
                                <td className="px-4 py-3 truncate">huykhaduy@gmail.com</td>
                                <td className="px-4 py-3 truncate">
                                    Hoạt động
                                </td>
                                <td className="px-4 py-3 flex items-center justify-center space-x-4">
                                    <Button size={"xs"} icon={PencilIcon} variant={"light"}
                                            color={"yellow"}>Sửa</Button>
                                    <Button size={"xs"} icon={TrashIcon} color={"red"} variant={"light"}>Xóa</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav
                        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                        aria-label="Table navigation"
                    >
                                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Hiển thị {" "}
                                         <span className="font-semibold text-gray-900 dark:text-white">
                                            1 - 10 {" "}
                                        </span>
                                            của {" "}
                                         <span className="font-semibold text-gray-900 dark:text-white">
                                            1000
                                        </span>
                                    </span>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    ...
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    100
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </AdminLayout>
    </>
}
