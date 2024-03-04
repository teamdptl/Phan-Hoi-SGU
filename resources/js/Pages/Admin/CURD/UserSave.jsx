import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Button, Flex, Select, SelectItem, Textarea, TextInput, Title} from "@tremor/react";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import InputError from "@/Components/InputError.jsx";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";


export default function ({roles}){
    const { message, error } = usePage().props.flash;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role: '',
        email: '',
        password: ''
    })

    const submitForm = (e) => {
        e.preventDefault();
        // console.log('submitForm', data )
        post('', { forceFormData: true });
    }

    useEffect(() => {
        if (error){
            Swal.fire({
                text: error,
                title: "Thất bại",
                icon: "error"
            })
        }
    }, [error]);

    return <>
        <AdminLayout title={"Thêm người dùng"}>
                <div className={"mb-4"}>
                <Link href={"/admin/user"} method="get">
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                </Link>
                    <Title>Thêm người dùng</Title>
                </div>
                <div
                    className="mx-auto max-w-screen-xl bg-white p-4 sm:p-5 sm:rounded-lg dark:bg-gray-800 overflow-hidden shadow-lg">
                    <form onSubmit={submitForm}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="tenNguoiDung"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng</label>
                                <TextInput value={data.name}  onChange={e => setData('name', e.target.value)} name="tenNguoiDung" placeholder={"Nhập tên người dùng"}></TextInput>
                                <InputError className={"mt-1"} message={errors.name}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="vaiTro"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vai trò</label>
                                {/*TODO: Load user role*/}
                                <Select value={data.role} onChange={(e) => setData('role', e)} name={"vaiTro"} placeholder={"Chọn vai trò"}>
                                    {roles.map(item => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <InputError className={"mt-1"} message={errors.role}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của người dùng</label>
                                <TextInput
                                value={data.email}  onChange={e => setData('email', e.target.value)}
                                    type={"email"}
                                    name="moTa"
                                    placeholder="Nhập email"
                                />
                                <InputError className={"mt-1"} message={errors.email}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="matKhau"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <TextInput
                                    value={data.password}  
                                    onChange={e => setData('password', e.target.value)}
                                    type={"password"}
                                    name="moTa"
                                    placeholder="Nhập mật khẩu"
                                />
                                <InputError className={"mt-1"} message={errors.password}/>
                            </div>
                        </div>
                        <Flex justifyContent={"end"} className={"mt-4 space-x-4"}>
                            <Button disabled={processing}>Thêm người dùng</Button>
                            <Link href={"/admin/user"} method="get">
                                <Button variant={"secondary"}>Hủy</Button>
                            </Link>
                        </Flex>
                    </form>
                </div>
        </AdminLayout>
    </>
}
