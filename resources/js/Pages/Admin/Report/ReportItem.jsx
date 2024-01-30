import {Badge, Card, Text} from "@tremor/react";
import {MapPinIcon} from "@heroicons/react/16/solid/index.js";

export default function (){
    return <>
        <Card className={"flex p-3 gap-4 cursor-pointer"}>
            <div className={"flex-none"}>
                <img className={"object-cover w-28 h-28 rounded"} alt={"Ảnh báo cáo"} src={"https://diennuocnhatlong.vn/uploads/nguyen-nhan-quat-tran-hu.jpg"}/>
            </div>
            <div className={"flex flex-col justify-center w-full"}>
                <div className={"flex justify-between"}>
                    <p className={"font-medium text-gray-600"}>Máy lạnh</p>
                    <Badge className={"text-sm"}>Đã gửi</Badge>
                </div>
                <p className={"text-sm text-gray-400"}>Tạo lúc 3:12 12/12/2023</p>
                <p className={"border-l-2 border-l-gray-500 text-sm pl-2 text-gray-700 mt-2"}>Mô tả chi tiết</p>
                <p className={"mt-2 text-sm inline-flex items-center"}>
                    <MapPinIcon className={"h-4 w-4 text-gray-500 mr-2"}/>
                    Phòng A.304 (Cơ sở chính)
                </p>
            </div>
        </Card>
    </>
}
