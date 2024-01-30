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
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function ({types, equipment, roomHave}) {
    return <>
        <AdminLayout title={"Thông tin thiết bị"}>
                <div className={"mb-4"}>
                    <Link href={"/admin/equipment"}>
                        <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    </Link>
                    <Title>Thông tin thiết bị</Title>
                </div>
                <div
                    className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                    <form>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="tenThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên
                                    thiết bị</label>
                                <TextInput value={equipment.name} disabled></TextInput>
                            </div>
                            <div className="w-full">
                                <label htmlFor="loaiThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại
                                    thiết bị</label>
                                <Select value={equipment.types_id} name={"loaiThietBi"} disabled>
                                    {types.map(type => (
                                        <SelectItem value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="moTa"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả
                                    thiết bị</label>
                                <Textarea
                                    className={"h-24"}
                                    value={equipment.description}
                                    name="moTa"
                                    placeholder="Mô tả thiết bị"
                                    disabled
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="hinhAnh"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh
                                    thiết bị</label>
                                <img src={equipment.icon} className={"w-auto h-24"} alt={"Icon thiết bị"}/>
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày
                                    tạo</label>
                                <p className={"text-sm"}>{new Date(equipment.created_at).toLocaleTimeString() + " " + new Date(equipment.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phòng có thiết bị này</label>
                                {roomHave.length > 0 && (
                                    <p className={"text-sm"}>{roomHave.join(", ")}</p>
                                )}

                                {roomHave.length === 0 && (
                                    <p className={"text-sm"}>Chưa có phòng nào</p>
                                )}
                            </div>
                        </div>
                        <Flex justifyContent={"end"} className={"mt-4 lg:mt-16 space-x-4"}>
                            <Link href={"/admin/equipment"}>
                                <Button variant={"secondary"}>Trở về</Button>
                            </Link>
                        </Flex>
                    </form>
                </div>
        </AdminLayout>
    </>
}
