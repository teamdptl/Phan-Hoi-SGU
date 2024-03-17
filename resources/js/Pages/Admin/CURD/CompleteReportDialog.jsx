import {Button, Dialog, DialogPanel, Flex, ProgressCircle, Text, Textarea, Title} from "@tremor/react";
import React, {useEffect, useRef, useState} from "react";
import CameraComponent from "@/Components/CameraComponent.jsx";
import ListImgHorizontal from "@/Components/ListImgHorizontal.jsx";
import InputError from "@/Components/InputError.jsx";
import {router, useForm, usePage} from "@inertiajs/react";
import Swal from "sweetalert2";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";

export default function ({report, open, setOpen}){
    const inputRef = useRef(null);
    const { message, error } = usePage().props.flash;
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá

    // Mảng chứa hình
    const [capturedImages, setCapturedImages] = useState([]);

    const { data, setData, post, progress, processing, errors } = useForm({
        content: null,
        reports_id: report.id,
        qrId: report.room.qr_code,
    })

    function submit(e) {
        e.preventDefault()
        post(route('room.complete'), {
            data: data
        });
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
        <Dialog open={open} onClose={(val) => setOpen(val)}>
            <DialogPanel>
                <div>
                    {progress && ( //Thanh tải file
                        <div className="fixed flex justify-center items-center inset-0 z-50 bg-black bg-opacity-50">
                            <ProgressCircle value={75} size="md"/>
                        </div>
                    )}

                    <div className={"max-w-xl mx-auto"}>
                        <Flex justifyContent="center" className="space-x-8 my-4">
                            <Text color="black" className={"font-medium text-xl text-[#4E4E51]"}>Hoàn thành báo
                                hỏng</Text>
                        </Flex>
                        <form onSubmit={submit} encType="multipart/form-data" method="post">
                            <div className="space-y-2">
                                <Text color="black" className={"font-medium text-lg mx-5 text-[#4E4E51]"}>Hình ảnh thiết
                                    bị</Text>
                                <div className="mx-5 mt-5 flex flex-row relative">
                                    <CameraComponent inputRef={inputRef} setCapturedImages={setCapturedImages}
                                                     className={"shrink-0"} setData={setData}/>
                                    <ListImgHorizontal inputRef={inputRef} capturedImages={capturedImages}
                                                       setCapturedImages={setCapturedImages} setData={setData}/>
                                </div>
                                <InputError message={errors.photo} className="mt-2 mx-5"/>
                            </div>
                            <div className="space-y-2 mx-5 mt-5">
                                <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết (nếu
                                    có)</Text>
                                <Textarea
                                    onChange={(e) => setData('content', e.target.value)}
                                    id="description"
                                    placeholder="Chi tiết công việc đã thực hiện..."
                                />
                                <InputError message={errors.content} className="mt-2"/>
                            </div>
                            <Flex justifyContent="center" className="space-x-4 mt-6 mb-8">
                                <Button type="submit"
                                        className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Xác nhận</Button>
                                <Button type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                }}
                                        color={"red"} variant={"secondary"}>Đóng</Button>
                            </Flex>
                        </form>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </>
}
