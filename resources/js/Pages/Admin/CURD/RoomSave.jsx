import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, Flex, MultiSelect, MultiSelectItem, Select, SelectItem, TextInput, Title} from "@tremor/react";
import {
    ArrowDownTrayIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline/index.js";
import {QRCodeCanvas} from "qrcode.react";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import React, {useEffect} from "react";
import InputError from "@/Components/InputError.jsx";

export default function ({equipments, url, qr_code}){
    const { errors } = usePage().props;

    const {data, setData} = useForm({
        equipments: [],
        name: '',
        type: '',
        facility: '',
    })

    const submitForm = (e) => {
        e.preventDefault();
        router.post('', {
            ...data,
            qr_code: qr_code
        }, {
            forceFormData: true
        });
    }

    return <>
        <AdminLayout title={"Thêm phòng"}>
                <div className={"mb-4"}>
                    <Link href={route('admin.room')}>
                        <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    </Link>
                    <Title>Thêm phòng</Title>
                </div>
                <section className="bg-gray-50 dark:bg-gray-900 antialiased">
                    <div className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                        <form onSubmit={submitForm}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="w-full">
                                    <label htmlFor="maPhong"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã
                                        phòng</label>
                                    <TextInput name="maPhong" placeholder={"Nhập mã phòng"} value={data.name} onValueChange={(value) => setData('name', value)}></TextInput>
                                    <InputError className={"mt-1"} message={errors.name}/>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="chucNang"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức năng</label>
                                    <Select name={"chucNang"} placeholder={"Chọn chức năng"} value={data.type} onValueChange={(value) => setData('type', value)}>
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
                                    <InputError className={"mt-1"} message={errors.type}/>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="coSo"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cơ sở</label>
                                    <Select name={"coSo"} placeholder={"Chọn cơ sở"} value={data.facility} onValueChange={(value) => setData('facility', value)}>
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
                                    <InputError className={"mt-1"} message={errors.facility}/>
                                </div>
                                <div className="w-full">
                                    {/*TODO: Thực hiện load thiết bị từ database*/}
                                    <label htmlFor="thietBi"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thiết bị trong phòng</label>
                                    <MultiSelect name={"thietBi"} placeholder={"Chọn thiết bị"} placeholderSearch={"Tìm kiếm"}
                                                 value={data.equipments} onValueChange={(value) => setData('equipments', value)}>
                                        {equipments.map(item => (
                                            <MultiSelectItem key={item.id}  value={item.id}>
                                                {item.name}
                                            </MultiSelectItem >
                                        ))}
                                    </MultiSelect>
                                    <InputError className={"mt-1"} message={errors.equipments}/>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="qrCode"
                                           className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Mã
                                        QR tạo ngẫu nhiên</label>
                                    <QRCodeCanvas size={200} value={url}/>
                                    <Flex className={"mt-4 space-x-4"} alignItems={"center"} justifyContent={"start"}>
                                        {/*TODO: Gọi api lấy mã mới*/}
                                        <Link href={''} preserveState preserveScroll only={['qr_code', 'url']}>
                                            <Button icon={ArrowPathRoundedSquareIcon} variant={"light"}>Tạo mã mới</Button>
                                        </Link>


                                        {/*TODO: Thực hiện hàm tải xuống hình ảnh*/}
                                        <Button icon={ArrowDownTrayIcon} variant={"light"}>Tải xuống</Button>
                                    </Flex>
                                    <InputError className={"mt-1"} message={errors.qr_code}/>
                                </div>
                            </div>
                            <Flex justifyContent={"end"} className={"mt-4 space-x-4"}>
                                <Button>Thêm phòng</Button>
                                <Link href={route('admin.room')}>
                                    <Button variant={"secondary"}>Hủy</Button>
                                </Link>
                            </Flex>

                        </form>
                    </div>
                </section>
        </AdminLayout>
    </>
}
