import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, DateRangePicker, Flex, Grid, TextInput, Title, Text} from "@tremor/react";
import ReportItem from "@/Pages/Admin/Report/ReportItem.jsx";
import {Head} from "@inertiajs/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {BarsArrowDownIcon, ChevronDownIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import { vi } from "date-fns/locale";

export default function (){
    return <>
        <AdminLayout title="Danh sách báo hỏng">
            <div className={"mb-4 flex flex-col md:flex-row md:justify-between md:items-center"}>
                <Title>Danh sách báo hỏng</Title>
                <DateRangePicker className={"mt-2 md:mt-0"} locale={vi} placeholder={"Chọn thời gian"} selectPlaceholder={"Chọn khoảng"}/>
            </div>
            <div className="mx-auto max-w-screen-7xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                            <TextInput icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24"}
                                       placeholder="Tìm báo hỏng"/>
                            <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Cơ sở</Button>
                            <Button size={"xs"}>Tìm kiếm</Button>
                        </div>
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                            <Button size={"xs"} icon={BarsArrowDownIcon} variant={"secondary"}>Sắp xếp</Button>
                        </div>
                    </div>
                    <div className={"grid grid-cols-1 gap-4 p-4 pt-2 md:grid-cols-2 lg:grid-cols-2"}>
                        <ReportItem/>
                        <ReportItem/>
                        <ReportItem/>
                    </div>
                </div>
            </div>
        </AdminLayout>
    </>
}
