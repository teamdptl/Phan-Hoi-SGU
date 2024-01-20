import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Button, Flex} from "@tremor/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <AppLayout>
            <Head title="Đăng nhập" />
            {/*<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">*/}
            <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"col"}>
                <div className="w-full sm:max-w-md my-12 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email của bạn" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Mật khẩu" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Lưu đăng nhập</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4 space-x-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Quên mật khẩu
                                </Link>
                            )}

                            {/*<PrimaryButton className="ms-4" disabled={processing}>*/}
                            {/*    Đăng nhập*/}
                            {/*</PrimaryButton>*/}
                            <Button>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </div>
            </Flex>

        </AppLayout>
    );
}
