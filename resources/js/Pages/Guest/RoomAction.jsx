import AppLayout from "@/Layouts/AppLayout.jsx";
import {Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import {Link} from "@inertiajs/react";

export default function RoomAction() {
    return <>
        <AppLayout>
            <div className={"min-h-64"}>
                <div className={"max-w-6xl mx-auto my-4 relative"}>
                    <img src={"/img/banner.jpg"} className={"h-48 md:h-64 lg:h-96 w-11/12 mx-auto object-cover object-top rounded-lg"}
                         alt={"Hình ảnh trường"} />
                </div>
                <Divider className={"max-w-5xl"}/>
                <Flex justifyContent={"center"} flexDirection={"col"}>
                    <Text>Bạn đang ở phòng</Text>
                    <Title className={"mt-2"}>C.A401</Title>
                    <Flex justifyContent={"center"} className={"space-x-8 mt-8"} >
                        <Link href={"/gui-bao-hong"}>
                            <Card className={"w-32 h-32 bg-[#EFF7FE] ring-0 p-4"}>
                                <div className={"flex justify-center items-center flex-col"}>
                                    <img src={"/icons/warning.png"} alt={"Warning icon"} className={"w-16 h-16 object-cover"}/>
                                    <p className={"text-center text-[#4A4A4A] font-medium mt-2"}>Báo hỏng</p>
                                </div>
                            </Card>
                        </Link>
                        <Link href={"/gui-danh-gia"}>
                            <Card className={"w-32 h-32 bg-[#EFF7FE] ring-0 p-4"}>
                                <div className={"flex justify-center items-center flex-col"}>
                                    <img src={"/icons/rating.png"} alt={"Rating icon"} className={"w-16 h-16 object-cover"}/>
                                    <p className={"text-center text-[#4A4A4A] font-medium mt-2"}>Đánh giá</p>
                                </div>
                            </Card>
                        </Link>
                    </Flex>
                    <Button className={"mt-12"}>Hướng dẫn sử dụng</Button>
                    <Flex justifyContent={"center"} alignItems={"center"} className={"mt-4 mb-12 space-x-1"}>
                        <Text className={"text-[#27272A]"}>Nếu bạn là nhân viên ? </Text>
                        <Link href={"/login"} className={"text-blue-500 font-medium"}>Đăng nhập</Link>
                    </Flex>
                </Flex>
            </div>
        </AppLayout>
    </>
}
