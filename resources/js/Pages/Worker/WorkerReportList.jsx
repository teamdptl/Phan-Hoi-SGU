import AppLayout from "@/Layouts/AppLayout.jsx";
import {
    Badge,
    Button,
    Card, DialogPanel,
    Divider,
    Flex,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Title,
    Dialog
} from "@tremor/react";
import {Head, Link, router, usePage} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import ReportItem from "@/Pages/Admin/Report/ReportItem.jsx";
import {Pagination} from "@mui/material";
import ReportInfo from "@/Components/ReportInfo.jsx";
import {RiCloseLine} from "react-icons/ri";

export default function WorkerReportList({processReport, successReport, workers, index }) {
    const { auth } = usePage().props;

    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        report: null,
    });

    const [tabIndex, setTabIndex] = useState(index ?? 0);

    // console.log(auth.user);
    const openDialog = (item) => {
        setDialogStatus({
            open: true,
            report: item,
        });
    }
    // useEffect(() => {console.log(roomId)}, [roomId]);

    // const redirectToCompleteForm = (reportId) => {
    //     router.get(route('room.complete', {
    //         id: qrCode,
    //         reports_id: reportId,
    //     }))
    // }

    return <>
        <AppLayout>
            <Head title={"Danh sách báo hỏng"}/>
            <div className={"min-h-64"}>
                <div className={"max-w-6xl mx-auto my-4 relative"}>
                    <img src={"/img/banner.jpg"} className={"brightness-90 h-48 md:h-64 lg:h-96 w-11/12 mx-auto object-cover object-top rounded-lg"}
                         alt={"Hình ảnh trường"} />
                </div>
                <Text className={"text-center text-xl text-blue-500 font-medium"}>Phản hồi cơ sở vật chất</Text>
                <Divider className={"lg:max-w-5xl my-4 max-w-sm"}/>
                <Flex justifyContent={"center"} flexDirection={"col"}>
                    <Title>Danh sách báo hỏng</Title>
                </Flex>
                {
                    auth.user != null && (
                        <>
                            <div className={"max-w-xl mx-auto px-4"}>
                                <TabGroup index={tabIndex} onIndexChange={setTabIndex}>
                                    <TabList className="mt-4">
                                        <Tab>Đang thực hiện</Tab>
                                        <Tab>Đã hoàn thành</Tab>
                                    </TabList>
                                    <TabPanels className={"my-4"}>
                                        <TabPanel className={"space-y-4"}>
                                            {(processReport.data === null || processReport.data.length === 0) && (
                                                <>
                                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Không có báo hỏng nào
                                                    </p>
                                                </>
                                            )}
                                            {processReport.data !== null && processReport.data.length > 0 && processReport.data.map((item, index) => (
                                                <ReportItem report={item} openReport={() => openDialog(item)}/>
                                            ))}

                                            {processReport.last_page > 1 && (
                                                <Pagination onChange={(_, num) => {
                                                    router.get('', {page_process: num}, {preserveScroll: true, preserveState: true})
                                                }}
                                                            className={"flex justify-center my-4"}
                                                            count={processReport.last_page}
                                                            page={processReport.current_page} shape="rounded"/>
                                            )}
                                        </TabPanel>
                                        <TabPanel className={"space-y-4"}>
                                            {(successReport.data === null || successReport.data.length === 0) && (
                                                <>
                                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Không có báo hỏng nào
                                                    </p>
                                                </>
                                            )}
                                            {successReport.data !== null && successReport.data.length > 0 && successReport.data.map((item, index) => (
                                                <ReportItem report={item} openReport={() => openDialog(item)}/>
                                            ))}

                                            {successReport.last_page > 1 && (
                                                <Pagination onChange={(_, num) => {
                                                    router.get('', {page_success: num}, {preserveScroll: true, preserveState: true})
                                                }}
                                                            className={"flex justify-center my-4"}
                                                            count={successReport.last_page}
                                                            page={successReport.current_page} shape="rounded"/>
                                            )}


                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </div>
                        </>
                    )
                }
            </div>
            {dialogStatus.report !== null && (
                <Dialog open={dialogStatus.open} onClose={(val) => setDialogStatus({report: null, open: val})} static={true}>
                    <DialogPanel className={"max-w-4xl"}>
                        <div className={"flex justify-between mb-4 items-center"}>
                            <Title>Thông tin báo hỏng</Title>

                            <button
                                type="button"
                                className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content"
                                onClick={() => setDialogStatus({report: null, open: false})}
                                aria-label="Close">
                                <RiCloseLine
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden={true}
                                />
                            </button>
                        </div>
                        <ReportInfo report={dialogStatus.report} worker={workers}/>
                    </DialogPanel>
                </Dialog>
            )}


        </AppLayout>
    </>
}
