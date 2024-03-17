import {displayTime} from "@/Utils/time.js";
import Rating from "@mui/material/Rating";

export default function({review}){

    return <>
        <div>
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="/img/user.png"
                    alt="Jese Leos"/>{review.users_id === null ? "Người dùng" : "Nhân viên " + review.users_id}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {displayTime(new Date(review.created_at))}
                </p>
            </div>
            <Rating className={"ml-6 mt-2"} defaultValue={review.rating} readOnly/>
            <p className="ml-6 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {review.y_kien}
            </p>
        </div>
    </>
}
