import {Card} from "@tremor/react";
import {CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {InformationCircleIcon} from "@heroicons/react/24/outline/index.js";
import {router} from "@inertiajs/react";

export default function ({link, title, created_at, content, type = "info"}){
    const onClick = () => {
        router.get(link);
    }

    return <>
        <Card onClick={onClick} className={`flex p-3 bg-white rounded-md gap-2 border-l-2 cursor-pointer
                ${type === 'success' ? "border-l-green-600" : ""}
                ${type === 'info' ? "border-l-blue-600" : ""}
                ${type === 'warning' ? "border-l-yellow-400" : ""}
                ${type === 'danger' ? "border-l-red-400" : ""}`}>
            <div>
                {type === 'success' && (
                    <CheckCircleIcon className={"text-green-600 h-6 w-6 rounded-full"}/>
                )}

                {type === 'info' && (
                    <InformationCircleIcon className={"text-blue-600 h-6 w-6 rounded-full"}/>
                )}

                {type === 'warning' && (
                    <ExclamationTriangleIcon className={"text-yellow-400 h-6 w-6 rounded-full"}/>
                )}

                {type === 'danger' && (
                    <XCircleIcon className={"text-red-400 h-6 w-6 rounded-full"}/>
                )}

            </div>
            <div className={"w-full"}>
                <div className={"flex justify-between items-center"}>
                    <h4 className={"font-medium"}>{title}</h4>
                    <p className={"whitespace-nowrap text-sm text-gray-600"}>{created_at}</p>
                </div>
                <p className={"text-sm text-gray-600 mt-1"}>{content}</p>
            </div>
        </Card>
    </>
}
