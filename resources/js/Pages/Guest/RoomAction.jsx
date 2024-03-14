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
import {facilityToString} from "@/Utils/facility.js";
import React, {useEffect, useState} from "react";
import ReportDetail from "@/Pages/Admin/CURD/ReportDetail.jsx";
import {Pagination} from "@mui/material";
import ReviewItem from "@/Pages/Admin/Review/ReviewItem.jsx";
import ReportInfo from "@/Components/ReportInfo.jsx";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {RiCloseLine} from "react-icons/ri";
import ReportWorkerItem from "@/Pages/Worker/ReportWorkerItem.jsx";
import {ADMIN, WORKER} from "@/Utils/role.js";

export default function RoomAction({ roomName, roomFacility, reports, reviews, workers }) {
    const { auth } = usePage().props;
    const { qrCode } = usePage().props;

    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        reportIndex: -1,
    });

    // console.log(auth.user);
    const openDialog = (index) => {
        setDialogStatus({
            open: true,
            reportIndex: index,
        });
    }
    // useEffect(() => {console.log(roomId)}, [roomId]);
    console.log(reports);
    console.log(workers);

    const redirectToCompleteForm = (reportId) => {
        router.get(route('room.complete', {
            id: qrCode,
            reports_id: reportId,
        }))
    }


    return <>
        <AppLayout>
            <Head title={"Phản hồi cho "+roomName}/>
            <div className={"min-h-64"}>
                <div className={"max-w-6xl mx-auto my-4 relative"}>
                    <img src={"/img/banner.jpg"} className={"brightness-90 h-48 md:h-64 lg:h-96 w-11/12 mx-auto object-cover object-top rounded-lg"}
                         alt={"Hình ảnh trường"} />
                </div>
                <Text className={"text-center text-xl text-blue-500 font-medium"}>Phản hồi cơ sở vật chất</Text>
                <Divider className={"lg:max-w-5xl my-4 max-w-sm"}/>
                <Flex justifyContent={"center"} flexDirection={"col"}>
                    <Text>Bạn đang ở phòng</Text>
                    <Title className={"my-2"}>{roomName}</Title>
                    <Badge>{facilityToString(roomFacility)}</Badge>
                    <Flex justifyContent={"center"} className={"space-x-8 mt-8"} >
                    <Link href={route('room.report') + `?id=${qrCode}`} method="get">
                            <Card className={"w-32 h-32 bg-[#EFF7FE] ring-0 p-4"}>
                                <div className={"flex justify-center items-center flex-col"}>
                                    <img src={"/icons/warning.png"} alt={"Warning icon"} className={"w-16 h-16 object-cover"}/>
                                    <p className={"text-center text-[#4A4A4A] font-medium mt-2"}>Báo hỏng</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href={route('room.review') + `?id=${qrCode}`}>
                            <Card className={"w-32 h-32 bg-[#EFF7FE] ring-0 p-4"}>
                                <div className={"flex justify-center items-center flex-col"}>
                                    <img src={"/icons/rating.png"} alt={"Rating icon"} className={"w-16 h-16 object-cover"}/>
                                    <p className={"text-center text-[#4A4A4A] font-medium mt-2"}>Đánh giá</p>
                                </div>
                            </Card>
                        </Link>
                    </Flex>
                    <Button className={"mt-12"}>Hướng dẫn sử dụng</Button>
                    {
                        auth.user && (
                            <>
                                <Flex justifyContent={"center"} alignItems={"center"} className={"mt-4 mb-12 space-x-1"}>
                                    <Text className={"text-[#27272A]"}>Xin chào, {auth.user.name} !</Text>
                                    <Link href={route('logout')} method="post" as="button" className={"text-blue-500 font-medium"}>Đăng xuất</Link>
                                </Flex>
                            </>
                        )
                    }

                    { !auth.user && (
                        <>
                            <Flex justifyContent={"center"} alignItems={"center"} className={"mt-4 mb-12 space-x-1"}>
                                <Text className={"text-[#27272A]"}>Nếu bạn là nhân viên ? </Text>
                                <Link href={route('login')} className={"text-blue-500 font-medium"}>Đăng nhập</Link>
                            </Flex>
                        </>
                    )}

                </Flex>
                {
                    auth.user != null && (
                        <>
                            <div className={"max-w-xl mx-auto px-4"}>
                                <TabGroup>
                                    <TabList className="mt-4">
                                        {auth.role.find(item => item.id === ADMIN) && (
                                            <Tab>Báo hỏng của phòng</Tab>
                                        )}
                                        {auth.role.find(item => item.id === WORKER) && (
                                            <Tab>Báo hỏng được giao</Tab>
                                        )}
                                        {/*<Tab>Đánh giá của phòng</Tab>*/}
                                    </TabList>
                                    <TabPanels className={"my-4"}>
                                        <TabPanel className={"space-y-4"}>
                                            {(reports.data === null || reports.data.length === 0) && (
                                                <>
                                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                        Không có báo hỏng nào
                                                    </p>
                                                </>
                                            )}
                                            {reports.data !== null && reports.data.length > 0 && reports.data.map((item, index) => (
                                                <ReportWorkerItem report={item} openReport={() => openDialog(index)}/>
                                            ))}

                                            {reports.last_page > 1 && (
                                                <Pagination onChange={(_, num) => {
                                                    router.get('', {page: num}, {preserveScroll: true})
                                                }}
                                                            className={"flex justify-center my-4"}
                                                            count={reports.last_page}
                                                            page={reports.current_page} shape="rounded"/>
                                            )}

                                        </TabPanel>
                                        {/*<TabPanel>*/}
                                        {/*    <ReviewItem/>*/}
                                        {/*</TabPanel>*/}
                                    </TabPanels>
                                </TabGroup>
                            </div>
                        </>
                    )
                }

            </div>
            {reports !== null && reports.data.length > 0 && (
                <Dialog open={dialogStatus.open} onClose={(val) => setDialogStatus({...dialogStatus, open: val})} static={true}>
                    <DialogPanel className={"max-w-4xl"}>
                        <div className={"flex justify-between mb-4 items-center"}>
                            <Title>Thông tin báo hỏng</Title>

                            <button
                                type="button"
                                className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content"
                                onClick={() => setDialogStatus({...dialogStatus, open: false})}
                                aria-label="Close">
                                <RiCloseLine
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden={true}
                                />
                            </button>
                        </div>
                        <ReportInfo report={reports.data[dialogStatus.reportIndex]} worker={workers}
                                    openCompleteForm={() => redirectToCompleteForm(reports.data[dialogStatus.reportIndex]?.id)}/>
                    </DialogPanel>
                </Dialog>
            )}


        </AppLayout>
    </>
}
