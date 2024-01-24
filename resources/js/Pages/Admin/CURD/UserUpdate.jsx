import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import {Button, Flex, Select, SelectItem, Textarea, TextInput, Title} from "@tremor/react";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";

export default function ({roles}){
    return <>
        <AdminLayout>
                <div className={"mb-4"}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                    <Title>Thêm người dùng</Title>
                </div>
                <div
                    className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="tenNguoiDung"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                                <TextInput name="tenNguoiDung" placeholder={"Nhập tên người dùng"}></TextInput>
                            </div>
                            <div className="w-full">
                                <label htmlFor="vaiTro"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vai trò</label>
                                {/*TODO: Load user role*/}
                                <Select name={"vaiTro"} placeholder={"Chọn vai trò"}>
                                    {roles.map(item => (
                                        <>
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        </>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của người dùng</label>
                                <TextInput
                                    type={"email"}
                                    name="moTa"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="matKhau"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <TextInput
                                    type={"password"}
                                    name="moTa"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                        </div>
                        <Flex justifyContent={"end"} className={"mt-4 space-x-4"}>
                            <Button>Thêm người dùng</Button>
                            <Button variant={"secondary"}>Hủy</Button>
                        </Flex>
                    </form>
                </div>
        </AdminLayout>
    </>
}
