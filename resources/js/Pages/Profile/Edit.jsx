import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Text, Title} from "@tremor/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Profile" />
            <div className="py-6 bg-blue-50">
                <Title className={"text-center mb-6"}>Thông tin tài khoản</Title>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/*<div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">*/}
                    {/*    <DeleteUserForm className="max-w-xl" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </AppLayout>
    );
}
