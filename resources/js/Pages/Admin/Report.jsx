import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, DateRangePicker, Grid, TextInput, Title, Text, Divider} from "@tremor/react";
import ReportItem from "@/Pages/Admin/Report/ReportItem.jsx";
import { Link, router} from "@inertiajs/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {
    ArrowPathIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon,
    FunnelIcon,
    HandRaisedIcon,
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon, EyeIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline/index.js";
import { vi } from "date-fns/locale";
import DropDownList from "@/Components/DropDownList";
import { useEffect, useState } from "react";
import '../../../css/home.css'
import { ChartBarIcon } from "@heroicons/react/24/outline";
import Pagination from "@mui/material/Pagination";
import Dropdown from "@/Components/Dropdown";
import { useLongPress } from "@uidotdev/usehooks";
import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";

const getDateFormatted = (date, plusDay = 0, plusMonth = 0, plusYear = 0) =>{
    const fullYear = date.getFullYear() + plusYear;
    const month = date.getMonth() + 1 + plusMonth;
    const day = date.getDate() + plusDay;
    return fullYear + "-" + month + "-" + day
}
export default function ({reports, currentPage, lastPage, first, last, total, search, from, to, sort, coSo, reportStatus}){
    const firstDate = new Date('1970-01-01')
    const currentDate = new Date()
    const lastMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const [facility, setFacility] = useState(coSo || '')
    const [status, setStatus] = useState(reportStatus || '')
    const [searchText, setSearchText] = useState(search||'')
    const [actions, setActions] = useState('action')
    const [sortType, setSortType] = useState(sort || 'asc')
    const [datePicker, setDatePicker] = useState({
        from: new Date(from) || currentDate,
        to: new Date(to) || lastMonthDate,
    });

    //Thêm thuộc tính isChecked cho từng báo cáo
    reports = reports.map(item => {
        item['isChecked'] = false
        return item
    })

    const [listReport, setListReport] = useState(reports);
    const [page, setPage] = useState(currentPage);
    const [listFacility, setListFacility] = useState([
        {
            optionValue: '',
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
    const [listReportStatus, setListReportStatus] = useState([
        {
            optionValue: '',
            icon: "<ChartBarIcon className=\"h-4 w-4 text-black\"/>",
            content: 'Tất cả'
        },
        {
            optionValue: 'sent',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            content: 'Đã gửi'
        },
        {
            optionValue: 'process',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            content: 'Đang thực hiện'
        },
        {
            optionValue: 'complete',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            content: 'Đã hoàn thành'
        },
        {
            optionValue: 'ignore',
            icon: <ChartBarIcon className="h-4 w-4 text-black"/>,
            content: 'Đã bỏ qua'
        }
    ])

    const [openFacilitiesMenu, setOpenFacilitiesMenu] = useState(false);
    const [openStatusMenu, setOpenStatusMenu] = useState(false);
    const [openCheckBox, setOpenCheckBox] = useState(false);
    const [longPressHandled, setLongPressHandled] = useState(false);
    const [checkOnPage, setCheckOnPage] = useState(false)


    // console.log(datePicker.from, datePicker.to)
    // console.log("Data khi render component", reports)
    // console.log("Data list reports", listReport)
    console.log("Báo cáo sau khi thêm ischecked", reports)

    const filterSearchText = () => {
        router.get('', {
            searchText: searchText,
            page: 1,
            from: getDateFormatted(datePicker.from),
            to: getDateFormatted(datePicker.to, 1),
        })
    }

    const filterFacility = (e) => {

        e.preventDefault()
        setFacility(e.target.id)
        router.get('', {
            facility: e.target.id,
            page: page,
            from: getDateFormatted(datePicker.from),
            to: getDateFormatted(datePicker.to, 1),
        })
    }

    const filterReportStatus = (e) => {

        e.preventDefault()
        setActions(e.target.id)
        router.get('', {
            status: e.target.id,
            page: page,
            from: getDateFormatted(datePicker.from),
            to: getDateFormatted(datePicker.to, 1),
        })
    }


    const changeSort = (e) => {
        setSortType(e.target.value)
        router.get('', {
            page: page,
            sortType: e.target.value,
            from: getDateFormatted(datePicker.from),
            to: getDateFormatted(datePicker.to, 1),
        })
    }

    const changePage = (pageNum) => {
        router.get('', {page: pageNum})
    }

    const openReport = (e, id) => {
        console.log("Open report: " ,e)
        console.log(e._reactName)
        if(!longPressHandled){
            if(e.target.localName !== 'input'){
                if(!openCheckBox){
                    router.get(route('admin.report') + '/' + id);
                }else{
                    setOpenCheckBox(false);
                }
            }
        }{
            console.log("Đã xử lý sự kiện long press")
            setLongPressHandled(false);
        }
    }

    const handleCheckAllReportOnPage = (isChecked) => {

        setListReport(listReport.map(item => {
            if(isChecked)
                item['isChecked'] = true
            else
                item['isChecked'] = false
            return item
        }))

        setCheckOnPage(isChecked);

    }

    const getListReportId = (typeIgnore)=>{
        console.log("Ignoring")
        let listReportId = []
        if(typeIgnore === 'onPage'){
            let i = 0;
            listReport.map((report)=>{
                if(report['isChecked'] && report['status'] === 'sent'){
                    listReportId[i++] = report['id'];
                }
            })
        }

        if(typeIgnore === 'all'){
            let i = 0;
            listReport.map((report)=>{
                if(report['status'] === 'sent'){
                    listReportId[i++] = report['id'];
                }
            })
        }

        return listReportId;
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

                            <Dropdown className="mt-0">
                                <Dropdown.Trigger>
                                    <Button className="flex items-center min-w-36" size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>
                                        <div class="flex justify-center items-center ml-2">
                                            <p class="mr-0.5">Filter</p>
                                            <FunnelIcon className={"h-4 w-4"}/>
                                        </div>
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content width="56" contentClasses="py-1 bg-white w-56">
                                    <Dropdown.Link isFocus={false} as="button" type="button" className={"flex items-center space-x-2"} onClick={(e)=>{e.preventDefault();setOpenFacilitiesMenu(!openFacilitiesMenu)}} preserveState>
                                        <BuildingOfficeIcon className={"h-4 w-4"}/>
                                        <p>Chọn cơ sở ({listFacility.map((item)=>{
                                            return item.optionValue === facility ? item.content : ''
                                        })})</p>
                                    </Dropdown.Link>
                                    {
                                        openFacilitiesMenu &&
                                        <div>
                                            {listFacility.map((item)=>{
                                                return <>
                                                    <div id={item.optionValue} className={"w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition duration-150 ease-in-out flex items-center space-x-2 pl-8 " + (item.optionValue === facility ? ' bg-gray-100' : ' bg-white')} onClick={(e)=>{filterFacility(e)}} preserveState>
                                                        <CheckCircleIcon id={item.optionValue} className={`h-4 w-4 mr-1` + (item.optionValue === facility ? ' text-black' : ' text-white')}/>
                                                        {item.content}
                                                    </div>
                                                </>
                                            })}
                                        </div>
                                    }


                                    <Dropdown.Link isFocus={false} as="button" type="button" className={"flex items-center space-x-2"} onClick={(e)=>{e.preventDefault();setOpenStatusMenu(!openStatusMenu)}} preserveState>
                                        <ArrowPathIcon className={"h-4 w-4"}/>
                                        <p>Chọn trạng thái ({listReportStatus.map((item)=>{
                                            return item.optionValue === status ? item.content : ''
                                        })})</p>
                                    </Dropdown.Link>
                                    {
                                        openStatusMenu &&
                                        <div>
                                            {listReportStatus.map((item)=>{
                                                return <>
                                                    <div id={item.optionValue} className={"w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition duration-150 ease-in-out flex items-center space-x-2 pl-8 " + (item.optionValue === status ? ' bg-gray-100' : ' bg-white')} onClick={(e)=>{filterReportStatus(e)}} preserveState>
                                                        <CheckCircleIcon id={item.optionValue} className={`h-4 w-4 mr-1` + (item.optionValue === status ? ' text-black' : ' text-white')}/>
                                                        {item.content}
                                                    </div>
                                                </>
                                            })}
                                        </div>
                                    }

                                </Dropdown.Content>
                            </Dropdown>
                            <Button onClick={filterSearchText} size={"xs"}>Tìm kiếm</Button>
                        </div>
                        <div className="w-full md:w-1/2 flex md:space-y-0 items-stretch md:items-center md:justify-end md:space-x-3 flex-shrink-0">
                            <select class="space-y-2 mr-2 md:mr-0 w-36 text-tremor-brand font-medium block py-1.5 px-2.5 text-sm border border-blue-500 hover:opacity-75 hover:cursor-pointer rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="default"
                            onChange={(e) => changeSort(e)}>
                                <option value="asc" selected={sortType === 'asc'}>Tăng dần</option>
                                <option value="desc" selected={sortType === 'desc'}>Giảm dần</option>
                            </select>
                            <Dropdown className="mt-0">
                                <Dropdown.Trigger>
                                    <Button size={"xs"} icon={ChevronDownIcon} variant={"secondary"}>Thao tác</Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link as="button" type="button" className={"flex items-center space-x-2"} onClick={()=>getListReportId('all')} preserveState>
                                        <HandRaisedIcon className={"h-4 w-4"}/>
                                        <p>Bỏ qua tất cả</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link href="/admin/report/ignore" method="post" data={{listReportId : getListReportId("onPage")}} as="button" type="button" className={"flex items-center space-x-2"} preserveState>
                                        <HandRaisedIcon className={"h-4 w-4"}/>
                                        <p>Bỏ qua báo cáo đã chọn</p>
                                    </Dropdown.Link>
                                    <Dropdown.Link as="button" type="button" onClick={(e) => {e.preventDefault(); window.open("/admin/report/export")}} className={"flex items-center space-x-2"}>
                                        <ArrowDownTrayIcon className={"h-4 w-4"}/>
                                        <p className=" mx-2">Xuất excel</p>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    { openCheckBox &&
                        <div className="flex justify-start items-center px-2 pt-2">
                            <Checkbox
                                    checked={checkOnPage}
                                    onChange={e => handleCheckAllReportOnPage(e.target.checked)}
                                    size="small"
                            ></Checkbox>
                            <p class="text-xs text-center h-fit">Tất cả trên trang</p>
                        </div>
                    }
                    <div className={"grid grid-cols-1 gap-4 p-4 pt-2 md:grid-cols-2 lg:grid-cols-2 min-h-40"}>

                        {
                            listReport === undefined ? 'Lỗi! Vui lòng refresh lại trang!' : (listReport.length === 0 ? 'Chưa có báo cáo nào!' :
                            listReport.map((item, index) =>{
                                return <ReportItem setListReport={setListReport} listReport={listReport} report={item} openCheckBox={openCheckBox} setOpenCheckBox={setOpenCheckBox} openReport={(e) => openReport(e, item.id)} setLongPressHandled={setLongPressHandled} />
                            }))
                        }
                    </div>
                    <Divider></Divider>
                    <nav
                        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 pt-0"
                        aria-label="Table navigation">
                                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Hiển thị {" "}
                                         {
                                             first !== null && last !== null && (
                                                 <>
                                                      <span className="font-semibold text-gray-900 dark:text-white">
                                                        {first} - {last} {" "}
                                                      </span>
                                                     trong {" "}
                                                 </>
                                             )
                                         }
                                         <span className="font-semibold text-gray-900 dark:text-white">
                                            {total} báo cáo
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
