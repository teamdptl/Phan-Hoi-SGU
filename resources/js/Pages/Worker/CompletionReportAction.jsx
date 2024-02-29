import {Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import AppLayout from "@/Layouts/AppLayout.jsx";
import { useForm } from '@inertiajs/react'
import CameraComponent from "@/Components/CameraComponent";
import ListImgHorizontal from "@/Components/ListImgHorizontal";
import { useEffect, useState, useRef } from "react";
import { ProgressCircle } from '@tremor/react';
import Swal from "sweetalert2";
import { router, usePage} from "@inertiajs/react";
import InputError from '@/Components/InputError';
import { TextInput } from "@tremor/react";
import { Textarea } from "@tremor/react";


export default function CompletionReportAction({userId, roomName, reportId}){
    const inputRef = useRef(null);
    const { message, error } = usePage().props.flash;
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá

    // Mảng chứa hình
    const [capturedImages, setCapturedImages] = useState([]);

    const { data, setData, post, progress, processing, errors } = useForm({
        photo: null,
        users_id: userId,
        content: null,
        reports_id: reportId
    })
 
    function submit(e) {
        e.preventDefault()
        post('/gui-phan-hoi-thiet-bi', data);
    }

    useEffect(()=>{
        inputRef.current.value = null;
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
                    <ProgressCircle value={75} size="md" />
                </div>
            )}
        
            <div className="md:flex xl:px-20 md:px-8 md:py-5" >
                <div className="relative md:w-7/12 lg:w-2/3">
                    <img className="object-cover h-full brightness-75" src="/img/classroom.jpg"></img>
                    <div class="absolute top-0 left-0 bottom-0 right-0 justify-center items-center flex">
                        <div class="text-white font-bold text-2xl w-fit">
                            <p>Phòng {roomName}</p>
                            <div class="border-2"></div>
                        </div>    
                    </div>
                   
                   
                </div>

                <div className="xl:pl-20 lg:pl-10 md:pl-0 md:w-5/12 lg:w-1/3" >
                    <Flex justifyContent="center"  className="space-x-8 my-5" >
                        <Text color="black" className={"font-medium text-xl mt-5 text-[#4E4E51]"}>Phản hồi báo cáo</Text>
                    </Flex>
                    <form onSubmit={submit} enctype="multipart/form-data" method="post">
                        <div className="space-y-2">
                            <Text color="black" className={"font-medium text-lg mx-5 text-[#4E4E51]"}>Hình ảnh thiết bị</Text>
                            <div class="mx-5 mt-5 flex flex-row relative">
                                <CameraComponent inputRef={inputRef} setCapturedImages={setCapturedImages} className={"shrink-0"} setData={setData}/>
                                <ListImgHorizontal inputRef={inputRef} capturedImages={capturedImages} setCapturedImages={setCapturedImages} setData={setData}/>
                            </div> 
                            <InputError message={errors.photo} className="mt-2 mx-5"/>
                        </div> 
                        <div className="space-y-2 mx-5 mt-5">
                            <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết (nếu có)</Text>
                            <Textarea
                                onChange={(e) => setData('content',e.target.value)}
                                id="description"
                                placeholder="Start typing here..."
                            />
                            <InputError message={errors.content} className="mt-2"/>
                        </div>
                        <Flex  justifyContent="center" className="space-x-8 mt-6 mb-8" >
                            <Button type="submit"   className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Gửi phản hồi</Button>
                        </Flex>
                    </form>
                </div>
            </div>
    </div>
 </AppLayout>
 

</>

}   
