import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import {Button, Flex, MultiSelect, MultiSelectItem, Select, SelectItem, TextInput, Title} from "@tremor/react";
import {
    ArrowDownTrayIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUturnLeftIcon,
    PlusIcon
} from "@heroicons/react/24/outline/index.js";
import {QRCodeCanvas} from "qrcode.react";

export default function (){
    return <>
        <AdminLayout>
                <div className={"mb-4"}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    <Title>Thêm phòng</Title>
                </div>
                <section className="bg-gray-50 dark:bg-gray-900 antialiased">
                    <div className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                        <form action="#">
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="w-full">
                                    <label htmlFor="maPhong"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã
                                        phòng</label>
                                    <TextInput name="maPhong" placeholder={"Nhập mã phòng"}></TextInput>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="chucNang"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức năng</label>
                                    <Select name={"chucNang"} placeholder={"Chọn chức năng"}>
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
                                    <Select name={"coSo"} placeholder={"Chọn cơ sở"}>
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
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thiết bị trong phòng</label>
                                    <MultiSelect name={"thietBi"} placeholder={"Chọn thiết bị"}>
                                        <MultiSelectItem  value="c">
                                            Máy chiếu
                                        </MultiSelectItem >
                                        <MultiSelectItem  value="1">
                                            Bàn ghế
                                        </MultiSelectItem >
                                        <MultiSelectItem  value="2">
                                            Micro
                                        </MultiSelectItem >
                                    </MultiSelect>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="qrCode"
                                           className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Mã
                                        QR tạo ngẫu nhiên</label>
                                    <QRCodeCanvas size={200} value="http://127.0.0.1:8000/admin/room/add/cjnp56brdy"/>
                                    <Flex className={"mt-4 space-x-4"} justifyContent={"start"}>
                                        {/*TODO: Gọi api lấy mã mới*/}
                                        <Button icon={ArrowPathRoundedSquareIcon} variant={"light"}>Tạo mã mới</Button>
                                        {/*TODO: Thực hiện hàm tải xuống hình ảnh*/}
                                        <Button icon={ArrowDownTrayIcon} variant={"light"}>Tải xuống</Button>
                                    </Flex>
                                </div>
                            </div>
                            <Flex justifyContent={"end"} className={"mt-4 space-x-4"}>
                                <Button>Thêm phòng</Button>
                                <Button variant={"secondary"}>Hủy</Button>
                            </Flex>

                        </form>
                    </div>
                </section>
        </AdminLayout>
    </>
}
