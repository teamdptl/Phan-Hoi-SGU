import {displayTime} from "@/Utils/time.js";
import Rating from "@mui/material/Rating";

export default function(){
    return <>
        <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                className="mr-2 w-6 h-6 rounded-full"
                src="/img/user.png"
                alt="Jese Leos"/>Người dùng</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {displayTime(new Date())}
            </p>
        </div>
        <Rating className={"ml-6 mt-2"} defaultValue={5} readOnly/>
        <p className="ml-6 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Phòng như chán ghê
        </p>
    </>
}
