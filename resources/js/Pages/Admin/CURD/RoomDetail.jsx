import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {
    Card,
    Flex,
    Grid,
    Metric,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Title,
    Text,
    Button, TextInput, Select, SelectItem, MultiSelect, MultiSelectItem
} from "@tremor/react";
import React from "react";
import {
    ArrowDownTrayIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUturnLeftIcon,
    ClipboardIcon
} from "@heroicons/react/24/outline/index.js";
import {Link} from "@inertiajs/react";
import {QRCodeCanvas} from "qrcode.react";

export default function ({room, equipments, url}){
    console.log(room);
    return <>
        <AdminLayout>
            <div className={"mb-4"}>
                <Link href={route('admin.room')}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                </Link>
                <Title>Chi tiết phòng A.1234</Title>
            </div>
            <TabGroup className="mt-4">
                <TabList>
                    <Tab>Thông tin</Tab>
                    <Tab>Báo hỏng</Tab>
                    <Tab>Đánh giá</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="w-full">
                                        <label htmlFor="maPhong"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã
                                            phòng</label>
                                        <TextInput name="maPhong" value={room.name} disabled></TextInput>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="chucNang"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức năng</label>
                                        <Select name={"chucNang"} value={room.type} disabled>
                                            <SelectItem value="Phòng học">
                                                Phòng học
                                            </SelectItem>
                                            <SelectItem value="Phòng thực hành">
                                                Phòng thực hành
                                            </SelectItem>
                                            <SelectItem value="Phòng hành chính">
                                                Phòng hành chính
                                            </SelectItem>
                                            <SelectItem value="Phòng vệ sinh">
                                                Phòng vệ sinh
                                            </SelectItem>
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="coSo"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cơ sở</label>
                                        <Select name={"coSo"} placeholder={"Chọn cơ sở"} value={room.facility} disabled>
                                            <SelectItem value="c">
                                                Cơ sở chính
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Cơ sở 1
                                            </SelectItem>
                                            <SelectItem value="2">
                                                Cơ sở 2
                                            </SelectItem>
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        {/*TODO: Thực hiện load thiết bị từ database*/}
                                        <label htmlFor="thietBi"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thiết
                                            bị trong phòng</label>
                                        <MultiSelect name={"thietBi"} placeholder={"Chưa có thiết bị"} value={room.equipments.map(item => item.id)} disabled>
                                            {equipments.map(item => (
                                                <MultiSelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelect>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="qrCode"
                                               className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Mã
                                            QR tạo ngẫu nhiên</label>
                                        <QRCodeCanvas size={200} value={url}/>
                                        <Flex className={"mt-4 space-x-4"} alignItems={"center"} justifyContent={"start"}>
                                            {/*TODO: Copy dữ liệu*/}
                                            <Button icon={ClipboardIcon} variant={"light"}>Copy link</Button>
                                            {/*TODO: Thực hiện hàm tải xuống hình ảnh*/}
                                            <Button icon={ArrowDownTrayIcon} variant={"light"}>Tải xuống</Button>
                                        </Flex>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <div className="h-96"/>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <div className="h-96"/>
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </AdminLayout>
    </>
}
