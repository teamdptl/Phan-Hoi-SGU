import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import {
    Button,
    Flex,
    MultiSelect,
    MultiSelectItem,
    Select,
    SelectItem,
    Textarea,
    TextInput,
    Title
} from "@tremor/react";
import {ArrowDownTrayIcon, ArrowPathRoundedSquareIcon, ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import {QRCodeCanvas} from "qrcode.react";
import {useEffect} from "react";
import InputError from "@/Components/InputError.jsx";

export default function ({types, equipment}) {
    const { errors } = usePage().props;
    const { data, setData, processing } = useForm({
        name: equipment.name,
        description: equipment.description,
        icon: null,
        type: equipment.types_id
    })

    const submitForm = (e) => {
        e.preventDefault();
        router.post('', data, {
            forceFormData: true
        });
    }

    return <>
        <AdminLayout title={"Cập nhật thiết bị"}>
                <div className={"mb-4"}>
                    <Link href={"/admin/equipment"}>
                        <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    </Link>
                    <Title>Cập nhật thiết bị</Title>
                </div>
                <div
                    className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                    <form onSubmit={submitForm}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="tenThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên
                                    thiết bị</label>
                                <TextInput value={data.name} onChange={e => setData('name', e.target.value)}
                                           name="tenThietBi" placeholder={"Nhập tên thiết bị"}></TextInput>
                                <InputError className={"mt-1"} message={errors.name}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="loaiThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại
                                    thiết bị</label>
                                <Select value={data.type} name={"loaiThietBi"} placeholder={"Chọn loại thiết bị"} onChange={e => setData('type', e)}>
                                    {types.map(type => (
                                        <SelectItem value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <InputError className={"mt-1"} message={errors.type}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="moTa"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả thiết bị</label>
                                <Textarea
                                    className={"h-24"}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    name="moTa"
                                    placeholder="Mô tả thiết bị"
                                />
                                <InputError className={"mt-1"} message={errors.description}/>
                            </div>
                            {/*<div className="w-full">*/}
                            {/*    <label htmlFor="hinhAnh"*/}
                            {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh*/}
                            {/*        thiết bị</label>*/}
                            {/*    <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600*/}
                            {/*        file:border-0*/}
                            {/*        file:bg-gray-100 file:me-4*/}
                            {/*        file:py-2 file:px-4*/}
                            {/*        dark:file:bg-gray-700 dark:file:text-gray-400"*/}
                            {/*           onChange={e => setData('icon', e.target.files[0])}*/}
                            {/*           accept="image/*"/>*/}
                            {/*    <InputError className={"mt-1"} message={errors.icon}/>*/}
                            {/*</div>*/}
                        </div>
                        <Flex justifyContent={"end"} className={"mt-4 lg:mt-16 space-x-4"}>
                            <Button disabled={processing}>Cập nhật</Button>
                            <Link href={"/admin/equipment"}>
                                <Button variant={"secondary"}>Hủy</Button>
                            </Link>
                        </Flex>
                    </form>
                </div>
        </AdminLayout>
    </>
}
