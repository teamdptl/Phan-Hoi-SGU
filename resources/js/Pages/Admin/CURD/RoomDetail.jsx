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
import React, {useEffect, useRef, useState} from "react";
import {
    ArrowDownTrayIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUturnLeftIcon, CheckIcon,
    ClipboardIcon
} from "@heroicons/react/24/outline/index.js";
import {Link} from "@inertiajs/react";
import {QRCodeCanvas} from "qrcode.react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReviewItem from "@/Pages/Admin/Review/ReviewItem.jsx";

export default function ({room, equipments, url}){
    const [isCopy, setCopy] = useState(false);

    const downloadStringAsFile = (data, filename) => {
        let a = document.createElement('a');
        a.download = filename;
        a.href = data;
        a.click();
    }

    const onCanvasButtonClick = () => {
        // console.log('fun')
        const node = document.querySelector("#qrCanvas");
        if (node == null) {
            return;
        }
        // For canvas, we just extract the image data and send that directly.
        const dataURI = node.toDataURL('image/png');

        downloadStringAsFile(dataURI, `phong_${room.name}_cs${room.facility}.png`);
    }

    console.log(room);

    return <>
        <AdminLayout>
            <div className={"mb-4"}>
                <Link href={route('admin.room')}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                </Link>
                <Title>Chi tiết phòng {room.name}</Title>
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
                                        <QRCodeCanvas id={"qrCanvas"} size={200} value={url}/>
                                        <Flex className={"mt-4 space-x-4"} alignItems={"center"} justifyContent={"start"}>
                                            {/*TODO: Copy dữ liệu*/}
                                            <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
                                                <Button icon={isCopy ? CheckIcon : ClipboardIcon} variant={"light"}>Copy link</Button>

                                            </CopyToClipboard>
                                            {/*TODO: Thực hiện hàm tải xuống hình ảnh*/}
                                            <Button icon={ArrowDownTrayIcon} variant={"light"} onClick={onCanvasButtonClick}>Tải xuống</Button>
                                        </Flex>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Link href={route('admin.report', { searchText: room.name})}>
                                <Button>Chuyển đến trang báo hỏng</Button>
                            </Link>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-6">
                            <Card>
                                <h4 className={"font-medium"}>Đánh giá: <span className={"font-normal"}>{parseFloat(room.average_rating).toFixed(2)} ({room.total_ratings} lượt)</span></h4>
                                <div className={"mt-4 ml-2 space-y-4"}>
                                    {room.reviews.length > 0 && room.reviews.map(review => (
                                        <>
                                            <ReviewItem review={review}/>
                                        </>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </AdminLayout>
    </>
}
