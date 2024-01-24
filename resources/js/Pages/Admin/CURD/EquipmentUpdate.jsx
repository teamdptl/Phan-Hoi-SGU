import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
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

export default function () {
    return <>
        <AdminLayout title={"Thêm thiết bị"}>
                <div className={"mb-4"}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    <Title>Thêm thiết bị</Title>
                </div>
                <div
                    className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="tenThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên
                                    thiết bị</label>
                                <TextInput name="tenThietBi" placeholder={"Nhập tên thiết bị"}></TextInput>
                            </div>
                            <div className="w-full">
                                <label htmlFor="loaiThietBi"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại
                                    thiết bị</label>
                                <Select name={"loaiThietBi"} placeholder={"Chọn loại thiết bị"}>
                                    <SelectItem value="Thiết bị điện tử">
                                        Thiết bị điện tử (máy tính, máy chiếu, loa, micro)
                                    </SelectItem>
                                    <SelectItem value="Thiết bị văn phòng">
                                        Thiết bị văn phòng (máy in, bút viết, bàn ghế)
                                    </SelectItem>
                                    <SelectItem value="Thiết bị chiếu sáng và giám sát">
                                        Thiết bị chiếu sáng và giám sát (đèn, camera)
                                    </SelectItem>
                                    <SelectItem value="Thiết bị làm lạnh, làm mát">
                                        Thiết bị làm lạnh, làm mát (máy lạnh, máy quạt)
                                    </SelectItem>
                                </Select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="moTa"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả thiết bị</label>
                                <Textarea
                                    name="moTa"
                                    placeholder="Mô tả thiết bị"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="hinhAnh"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh
                                    thiết bị</label>
                                <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                                    file:border-0
                                    file:bg-gray-100 file:me-4
                                    file:py-2 file:px-4
                                    dark:file:bg-gray-700 dark:file:text-gray-400"  accept="image/*"/>
                            </div>
                        </div>
                        <Flex justifyContent={"end"} className={"mt-4 space-x-4"}>
                            <Button>Thêm thiết bị</Button>
                            <Button variant={"secondary"}>Hủy</Button>
                        </Flex>
                    </form>
                </div>
        </AdminLayout>
    </>
}
