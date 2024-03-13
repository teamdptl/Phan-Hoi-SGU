import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {
    Card,
    Grid,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Title,
    Text,
    TableCell,
    TableHeaderCell,
    Table, TableHead, TableRow, TableBody, DateRangePicker, DateRangePickerItem, Callout, Button
} from "@tremor/react";
import React, {useEffect, useState} from "react";
import { vi } from 'date-fns/locale';
import {RiCheckboxCircleFill} from "react-icons/ri";
import {facilityToString} from "@/Utils/facility.js";
import {displayTime} from "@/Utils/time.js";
import LogBox from "@/Components/LogBox.jsx";
import {Link, router} from "@inertiajs/react";
import {useDebounce, useDebouncedCallback} from "use-debounce";
import deepEqual from 'deep-equal';
import moment from "moment";

export default function Dashboard({rooms, thongBao, total, done, notDone, ignore, facility, dateStart, dateEnd}){
    const [dateRange, setDateRange] = useState({from: new Date(dateStart), to: new Date(dateEnd)});

    const onChangeFacility = (e) => {
        router.get('', {
            coSo: e.target.value
        })
    }

    const onSearchDate = () => {
        router.get('', {
            dateStart: moment(dateRange.from).format('YYYY-MM-DD'),
            dateEnd: moment(dateRange.to).format('YYYY-MM-DD')
        })
    }


    return <>
        <AdminLayout>
            <div className={"flex flex-col justify-start md:flex-row md:justify-between md:items-center gap-4"}>
                <Title>Bảng điều khiển</Title>
                <div className={"flex gap-4 flex-col sm:flex-row justify-start"}>
                    <div className={"flex gap-4 sm:flex-row justify-start"}>
                        <DateRangePicker onValueChange={(value) => setDateRange(value)} value={dateRange} placeholder={"Chọn ngày"} selectPlaceholder={"Chọn khoảng"} locale={vi} className="max-w-sm sm:min-w-60" enableSelect={false}>
                        </DateRangePicker>
                        <select value={facility} className="lg:w-48 max-w-64 border-tremor-border bg-light border rounded-tremor-default text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={onChangeFacility}>
                            <option value="">Tất cả</option>
                            <option value="c">Cơ sở chính</option>
                            <option value="1">Cơ sở 1</option>
                            <option value="2">Cơ sở 2</option>
                        </select>
                    </div>

                    <Button onClick={onSearchDate}>Tìm kiếm</Button>
                </div>
            </div>
            <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
                <Card>
                    <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                        Báo hỏng mới
                    </p>
                    <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {total}
                    </p>
                </Card>
                <Card>
                    <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                        Báo hỏng chưa hoàn thành
                    </p>
                    <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {notDone}
                        {/*{ignore > 0 && (*/}
                        {/*    <span className={"text-sm ml-2"}>({ignore} bỏ qua)</span>*/}
                        {/*)}*/}
                    </p>
                </Card>
                <Card>
                    <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                        Báo hỏng đã hoàn thành
                    </p>
                    <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {done}
                    </p>
                </Card>
                <Card>
                    <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                        Phòng có nhiều báo hỏng
                    </p>
                    <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {rooms[0]?.name}
                    </p>
                </Card>
            </Grid>
            <div className={"grid grid-cols-6 mt-4 gap-4"}>
                <Card className={"lg:col-span-4 col-span-6"}>
                    <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Top 20 phòng có nhiều báo hỏng
                    </h3>
                    <Table className="mt-2 max-h-80">
                        <TableHead>
                            <TableRow
                                className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <TableHeaderCell
                                    className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    STT
                                </TableHeaderCell>
                                <TableHeaderCell
                                    className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Mã phòng
                                </TableHeaderCell>
                                <TableHeaderCell
                                    className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Cơ sở
                                </TableHeaderCell>
                                <TableHeaderCell
                                    className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Chức năng
                                </TableHeaderCell>
                                <TableHeaderCell
                                    className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Chưa hoàn thành
                                </TableHeaderCell>
                                {/*<TableHeaderCell*/}
                                {/*    className="text-tremor-content-strong dark:text-dark-tremor-content-strong">*/}
                                {/*    Đang xử lý*/}
                                {/*</TableHeaderCell>*/}
                                <TableHeaderCell
                                    className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Hoàn thành
                                </TableHeaderCell>
                                <TableHeaderCell
                                    className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Tổng
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.length > 0 && rooms.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted">
                                    <TableCell
                                        className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{facilityToString(item.facility)}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell className={"text-center"}>{item.reports.filter(item => item.status !== 'complete').length}</TableCell>
                                    {/*<TableCell className={"text-center"}>{item.reports.filter(item => item.status === 'process').length}</TableCell>*/}
                                    <TableCell className={"text-center"}>{item.reports.filter(item => item.status === 'complete').length}</TableCell>
                                    <TableCell className={"text-center"}>{item.reports.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <div className={"lg:col-span-2 col-span-6"}>
                    <div className={"flex justify-between"}>
                        <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Nhật kí hoạt động
                        </h3>
                        <Link href={route('admin.notification')}>
                            <Button variant={"light"}>Xem thêm</Button>
                        </Link>

                    </div>

                    <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2 pb-4">
                        {thongBao.map((item) => (
                            <LogBox link={item.link} title={item.title} created_at={displayTime(item.created_at)} content={item.message} type={item.type}/>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    </>
}
