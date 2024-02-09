import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, DateRangePicker, Grid, TextInput, Title, Text} from "@tremor/react";
import ReportItem from "@/Pages/Admin/Report/ReportItem.jsx";
import { Link, router} from "@inertiajs/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {BarsArrowDownIcon, ChevronDownIcon, WrenchScrewdriverIcon} from "@heroicons/react/24/outline/index.js";
import { vi } from "date-fns/locale";
import DropDownList from "@/Components/DropDownList";
import { useState } from "react";
import '../../../css/home.css'
import { ChartBarIcon } from "@heroicons/react/24/outline";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';

const getDateFormatted = (date, plusDay = 0, plusMonth = 0, plusYear = 0) =>{
    const fullYear = date.getFullYear() + plusYear;
    const month = date.getMonth() + 1 + plusMonth;
    const day = date.getDate() + plusDay;
    return fullYear + "-" + month + "-" + day
}
export default function ({reports}){
    const firstDate = new Date('1970-01-01')
    const currentDate = new Date()
    const lastMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const [facility, setFacility] = useState('all')
    const [searchText, setSearchText] = useState('')
    const [actions, setActions] = useState('action')
    const [arrange, setArrange] = useState('increase')
    const [datePicker, setDatePicker] = useState({
        from: lastMonthDate,
        to: currentDate,
      });

    const [listReport, setListReport] = useState(reports.data);
    const [page, setPage] = useState(reports.current_page)
    const [listFacility, setListFacility] = useState([
        {
            optionValue: 'all',
            icon: "<ChartBarIcon className=\"h-4 w-4 text-black\"/>",                 
            content: 'Tất cả'
        },
        {
            optionValue: 'c',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,                 
            content: 'Cơ sở chính'
        },
        {
            optionValue: '1',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,                 
            content: 'Cơ sở 1'
        },
        {
            optionValue: '2',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,                 
            content: 'Cơ sở 2'
        }
    ])

    console.log("Data khi render component", reports)
    console.log("Data list reports", listReport)
    

    const handleFilter = () => {
        console.log(facility, searchText, actions, arrange)
        router.post('/admin/report/filters',{
            facility: facility,
            searchText: searchText,
            actions: actions,
            from: getDateFormatted(datePicker.from || firstDate),
            to: getDateFormatted(datePicker.to || new Date(), 1),
            arrange: arrange,
        },
        {
            onSuccess: (data) =>{
                console.log(data)
                setListReport(data.props.reports.data)
                setPage(data.props.reports.current_page)
            }
        })
    }

    const handlePageNav = (event, value) => {
        const url = 'http://localhost:8000/admin/report/filters?page=' + value
        console.log("HandlePageNav", event)
        console.log(value)
        console.log(url)
        setPage(value)
        router.post(url, {
            facility: facility,
            searchText: searchText,
            actions: actions,
            from: getDateFormatted(datePicker.from || firstDate),
            to: getDateFormatted(datePicker.to || new Date(), 1),
            arrange: arrange,
        }, {
            onSuccess: (data) => {
                console.log("On succcess page nav: ",data)
                setListReport(data.props.reports.data)
            }
        })
    }
    
    return <>
        <AdminLayout title="Danh sách báo hỏng">
            <div className={"mb-4 flex flex-col md:flex-row md:justify-between md:items-center"}>
                <Title>Danh sách báo hỏng</Title>
                <DateRangePicker 
                    className={"mt-2 md:mt-0"}
                    value={datePicker} 
                    onValueChange={setDatePicker}  
                    locale={vi} placeholder={"Chọn thời gian"} 
                    selectPlaceholder={"Chọn khoảng"}/>
            </div>
            <div className="mx-auto max-w-screen-7xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                            <TextInput value={searchText} onChange={(e) => setSearchText(e.target.value)} icon={MagnifyingGlassIcon} className={"md:max-w-64 min-w-24"}
                                       placeholder="Tìm báo hỏng"/>
                            {/* <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Cơ sở</Button> */}
                            <DropDownList value={facility} setValue={setFacility} listItem={listFacility} attribute="max-w-36 sm:w-full text-tremor-brand font-medium"></DropDownList>
                            <Button onClick={handleFilter} size={"xs"}>Tìm kiếm</Button>
                        </div>
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            {/* <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button> */}
                            <DropDownList value={actions} setValue={setActions} listItem={[
                                {
                                    optionValue: 'action',
                                    icon: <WrenchScrewdriverIcon class="h-6 w-6 text-gray-500" />,                 
                                    content: 'Thao tác'
                                },
                                {
                                    optionValue: 'export',
                                    icon: <WrenchScrewdriverIcon/>,                 
                                    content: 'Xuất Excel'
                                },
                                {
                                    optionValue: 'delete',
                                    icon: <WrenchScrewdriverIcon/>,                 
                                    content: 'Xóa hàng loạt'
                                },
                                {
                                    optionValue: 'ignore',
                                    icon: <WrenchScrewdriverIcon/>,                 
                                    content: 'Bỏ qua hàng loạt'
                                },
                            ]} attribute="min-w-32 w-full text-tremor-brand font-medium text-last-center"></DropDownList>
                            {/* <Button size={"xs"} icon={BarsArrowDownIcon} variant={"secondary"}>Sắp xếp</Button> */}
                            <DropDownList value={arrange} 
                                    setValue={setArrange}
                                    attribute="min-w-32 w-full text-tremor-brand font-medium text-last-center" 
                                    listItem={[
                                        {
                                            optionValue: 'increase',
                                            icon: <WrenchScrewdriverIcon/>,                 
                                            content: 'Tăng dần'
                                        },
                                        {
                                            optionValue: 'decrease',
                                            icon: <WrenchScrewdriverIcon/>,                 
                                            content: 'Giảm dần'
                                        },
                                        ]}/>
                        </div>
                    </div>
                    <div className={"grid grid-cols-1 gap-4 p-4 pt-2 md:grid-cols-2 lg:grid-cols-2 min-h-40"}>
                        {
                            listReport === undefined ? 'Lỗi! Vui lòng refresh lại trang!' : (listReport.length === 0 ? 'Chưa có báo cáo nào!' : 
                            listReport.map((item, index) =>{
                                return <ReportItem report={item}/>
                            }))
                        }
                    </div>
                </div>
                <div class="flex justify-center items-center mt-2">
                    <Pagination page={page} 
                                count={reports.last_page} 
                                variant="outlined" 
                                shape="rounded"
                                onChange={handlePageNav}/>
                </div>
            </div>
        </AdminLayout>
    </>
}