import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Button} from "@tremor/react";
import InputLabel from "@/Components/InputLabel.jsx";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AppLayout>
            <Head title="Quên mật khẩu" />
            <div className={"flex flex-col items-center my-8"}>
                <div className="mb-4 text-sm text-gray-600 flex flex-col items-center">
                    <p className={"text-lg font-medium mb-2"}>Quên mật khẩu</p>
                    <p className={"px-2 text-center"}>Chúng tôi sẽ gửi cho bạn một email để reset mật khẩu</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className={"w-full px-6 max-w-md mt-4"}>
                    <InputLabel htmlFor="email" value="Email của bạn" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>

                    <div className="flex items-center justify-center mt-4">
                        <Button disabled={processing}>
                            Gửi link reset mật khẩu
                        </Button>
                    </div>
                </form>
            </div>

        </AppLayout>
    );
}
