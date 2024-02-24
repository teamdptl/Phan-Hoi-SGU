import AppLayout from "@/Layouts/AppLayout.jsx";
import {Badge, Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import {Head, Link, usePage} from "@inertiajs/react";
import {facilityToString} from "@/Utils/facility.js";
import { useEffect } from "react";

export default function RoomAction({ roomName, roomFacility, id }) {
    const { auth } = usePage().props;
    const { roomId } = usePage().props;
    // console.log(auth.user);

    // useEffect(() => {console.log(roomId)}, [roomId]);

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
                    <Link href={route('room.report') + `?roomId=${roomId}`} method="get">
                            <Card className={"w-32 h-32 bg-[#EFF7FE] ring-0 p-4"}>
                                <div className={"flex justify-center items-center flex-col"}>
                                    <img src={"/icons/warning.png"} alt={"Warning icon"} className={"w-16 h-16 object-cover"}/>
                                    <p className={"text-center text-[#4A4A4A] font-medium mt-2"}>Báo hỏng</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href={route('room.review') + `?\id=${roomId}`}>
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
            </div>
        </AppLayout>
    </>
}
