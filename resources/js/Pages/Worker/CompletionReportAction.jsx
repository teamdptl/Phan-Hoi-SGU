import {Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import AppLayout from "@/Layouts/AppLayout.jsx";
import CameraComponent from "@/Components/CameraComponent";
import ListImgHorizontal from "@/Components/ListImgHorizontal";
import { useEffect, useState, useRef } from "react";
import { ProgressCircle } from '@tremor/react';
import Swal from "sweetalert2";
import InputError from '@/Components/InputError';
import { TextInput } from "@tremor/react";
import { Textarea } from "@tremor/react";
import ReportInfo from "@/Components/ReportInfo.jsx";
import ReportItem from "@/Pages/Admin/Report/ReportItem.jsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import {Head, Link, useForm, usePage} from "@inertiajs/react";

export default function CompletionReportAction({report, qrCode}){
    const inputRef = useRef(null);
    const { message, error } = usePage().props.flash;
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá

    // Mảng chứa hình
    const [capturedImages, setCapturedImages] = useState([]);

    const { data, setData, post, progress, processing, errors } = useForm({
        content: null,
        reports_id: report.id,
        qrId: qrCode
    })

    function submit(e) {
        e.preventDefault()
        post('/gui-phan-hoi-thiet-bi', data);
    }

    useEffect(()=>{
        if (inputRef.current){
            inputRef.current.value = null;
        }
    },[capturedImages])

    useEffect(()=>{
        console.log(message);
        setData({ ...data, errors: {} });
    },[message])

    useEffect(() => {
        if (message){
            Swal.fire({
                text: message,
                title: "Thành công",
                icon: "success"
            }).then(() => {
                // Tải lại trang web sau khi người dùng nhấp vào nút "OK"
                window.location.reload();
              });
        }
    }, [message]);

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
 <AppLayout>
     <div className="min-h-64">
         {progress && ( //Thanh tải file
             <div className="fixed flex justify-center items-center inset-0 z-50 bg-black bg-opacity-50">
                 <ProgressCircle value={75} size="md"/>
             </div>
         )}

         <div className={"max-w-xl mx-auto"}>
         <div className={"mt-6"}>
                <Link href={route('room.select') + `?id=${qrCode}`} method="get" className="mx-6">
                    <Button icon={ArrowUturnLeftIcon} variant={"light"}>Trở về</Button>
                </Link>
                <Flex justifyContent="center" className="">
                 <Text color="black" className={"font-medium text-xl  text-[#4E4E51]"}>Hoàn thành báo hỏng</Text>
             </Flex>
        </div>
            
             <div className={"mx-5 mt-5 mb-5"}>
                 <Text color="black" className={"font-medium text-lg mb-2 text-[#4E4E51]"}>Báo hỏng</Text>
                 <ReportItem report={report} openReport={() => {}}/>
             </div>
             <form onSubmit={submit} encType="multipart/form-data" method="post">
                 <div className="space-y-2">
                     <Text color="black" className={"font-medium text-lg mx-5 text-[#4E4E51]"}>Hình ảnh thiết bị</Text>
                     <div className="mx-5 mt-5 flex flex-row relative">
                         <CameraComponent inputRef={inputRef} setCapturedImages={setCapturedImages}
                                          className={"shrink-0"} setData={setData}/>
                         <ListImgHorizontal inputRef={inputRef} capturedImages={capturedImages}
                                            setCapturedImages={setCapturedImages} setData={setData}/>
                     </div>
                     <InputError message={errors.photo} className="mt-2 mx-5"/>
                 </div>
                 <div className="space-y-2 mx-5 mt-5">
                     <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết (nếu có)</Text>
                     <Textarea
                         onChange={(e) => setData('content', e.target.value)}
                         id="description"
                         placeholder="Start typing here..."
                     />
                     <InputError message={errors.content} className="mt-2"/>
                 </div>
                 <Flex justifyContent="center" className="space-x-8 mt-6 mb-8">
                     <Button type="submit" className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Gửi phản hồi</Button>
                 </Flex>
             </form>
         </div>
     </div>
 </AppLayout>


</>

}
