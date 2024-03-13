import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, Card, DateRangePicker, Title} from "@tremor/react";
import {vi} from "date-fns/locale";
import React, {useEffect, useState} from "react";
import {displayTime} from "@/Utils/time.js";
import LogBox from "@/Components/LogBox.jsx";
import {router} from "@inertiajs/react";
import {Pagination} from "@mui/material";
import moment from "moment";
export default function ({notification, dateStart, dateEnd, current, last_page}){
    const [dateRange, setDateRange] = useState({from: new Date(dateStart), to: new Date(dateEnd)});

    const onSearchDate = () => {
        router.get('', {
            dateStart: moment(dateRange.from).format('YYYY-MM-DD'),
            dateEnd: moment(dateRange.to).format('YYYY-MM-DD')
        })
    }

    const changePage = (newPage) => {
        router.get('', {
            page: newPage
        })
    }

    return <>
        <AdminLayout>
            <div className={"flex justify-between items-center mb-4"}>
                <Title>Thông báo</Title>
                <div className={"flex gap-2"}>
                    <DateRangePicker onValueChange={(value) => setDateRange(value)} value={dateRange} placeholder={"Chọn ngày"}
                                     selectPlaceholder={"Chọn khoảng"} locale={vi} className="max-w-sm sm:min-w-60" enableSelect={false}></DateRangePicker>
                    <Button onClick={onSearchDate}>Tìm kiếm</Button>
                </div>
            </div>
            <div className={"space-y-3"}>
                {notification.length > 0 && notification.map(item => (
                    <>
                        <LogBox link={item.link} title={item.title} created_at={displayTime(item.created_at)} content={item.message} type={item.type}/>
                    </>
                ))}

                {notification.length === 0 && (
                    <>
                        <p>Không có thông báo</p>
                    </>
                )}
            </div>

            <div className={"flex justify-center mt-4"}>
                { last_page > 1 && (
                    <Pagination defaultPage={1} page={parseInt(current)} count={last_page} onChange={(e, newPage) => changePage(newPage)} color="primary"/>
                )}
            </div>

        </AdminLayout>
    </>
}
