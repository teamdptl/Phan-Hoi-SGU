import {Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import AppLayout from "@/Layouts/AppLayout.jsx";
import CameraComponent from "@/Components/CameraComponent";
import ListImgHorizontal from "@/Components/ListImgHorizontal";
import { useEffect, useState, useRef } from "react";
import DropDownListDevice from "@/Components/DropDownListDevice";
import { TextInput } from "@tremor/react";
import { Textarea } from "@tremor/react";
import ReCAPTCHA from "react-google-recaptcha";
import InputError from '@/Components/InputError';
import { router, usePage, useForm, Link} from "@inertiajs/react";
import Swal from "sweetalert2";
import MyCaptcha from "@/Components/MyCaptcha";
import { ProgressCircle } from '@tremor/react';
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";




export default function ReportAction({userEquimentIds, roomName, roomId, qrCode}){

    const inputRef = useRef(null);

    const { message, error } = usePage().props.flash;
    //Captcha
    const captchaRef = useRef(null)
    const [token, setToken] = useState(null)//Lưu token được trả về từ google recaptcha
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá

    // Mảng chứa hình
    const [capturedImages, setCapturedImages] = useState([]);

    const [selectedValue, setSelectedValue] = useState(""); //Bật tắt input khác

    const { data, setData, post, progress, processing, errors } = useForm({
        photo: null,
        idEquipment: selectedValue,
        other: null,
        description: null,
        rooms_id: roomId,
        token: token
    })

    useEffect(()=>{
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

    function submit(e) {
        e.preventDefault()
        post('/gui-bao-hong', data);
      }

      function onChange(value) {
        console.log("Captcha value:", value);
      }

      useEffect(() => {
        // Gán giá trị của selectedValue vào data.idEquipment
        setData(prevData => ({ ...prevData, idEquipment: selectedValue }));
    }, [selectedValue]);

    useEffect(() => {
        setData(prevData => ({
          ...prevData,
          token: token
        }));
      }, [token]);

        useEffect(()=>{
            console.log("Giá trị của images "+data.photo);
            console.log("Giá trị của capturedImages "+capturedImages);
            // console.log("Giá trị của idEquipment: "+data.idEquipment);
            // console.log("Giá trị của selectDevice other: "+data.other);
            // console.log("Giá trị của des "+data.description);
            // console.log("Giá trị của RoomID "+data.roomId);
            // console.log("Giá trị của token "+data.token);
            inputRef.current.value = null;

        },[capturedImages,data.idEquipment, data.other, data.photo, data.description, selectedValue, data.token]);

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

                <div className="xl:pl-20 lg:pl-10 md:pl-0 md:pt-4 md:w-5/12 lg:w-1/3" >
                <div className={"mt-3"}>
                <Link href={route('room.select') + `?id=${qrCode}`} method="get" className="mx-5 ">
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} >Trở về</Button>
                </Link>
                    <Flex justifyContent="center"  className="space-x-8 mb-4 " >
                        <Text color="black" className={"font-medium text-xl  text-[#4E4E51]"}>Tạo báo hỏng</Text>
                    </Flex>
                    </div>
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
                            <Text color="black" className={"font-medium text-lg text-[#4E4E51]" }>Chọn thiết bị</Text>
                            <DropDownListDevice selectedValue={selectedValue} userEquimentIds={userEquimentIds}  setData={setData} setSelectedValue={setSelectedValue}/>
                            <InputError message={errors.idEquipment} className="mt-2"/>

                        </div>

                            {selectedValue == "-1" && (
                                <div className="space-y-2 mx-5 mt-5">
                                <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Thiết bị khác</Text>
                                <TextInput
                                    placeholder="Nhập tên thiết bị khác"
                                    onChange={e =>{  setData('other', e.target.value);
                                }}
                                />
                               <InputError message={errors.other} className="mt-2"/>

                                </div>
                            )}
                        <div className="space-y-2 mx-5 mt-5">
                            <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết (nếu có)</Text>
                            <Textarea
                            onChange={(e) => setData('description',e.target.value)}
                            id="description"
                            placeholder="Hãy mô tả cụ thể vị trí thiết bị. VD: Máy lạnh ở dãy bàn cuối"
                            />
                            <InputError message={errors.description} className="mt-2"/>
                        </div>
                        <div className="space-y-2 mx-5 mt-5">
                            <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Xác nhận bạn không phải robot</Text>
                            <MyCaptcha captchaRef={captchaRef} setToken={setToken} setDisableButton={setDisable} />

                        </div>
                        <Flex  justifyContent="center" className="space-x-8 mt-6 mb-8" >
                            <Button type="submit" disabled={disable}  className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Gửi báo cáo</Button>
                        </Flex>
                    </form>
                </div>

                </div>


            </div>

        </AppLayout>
    </>

}
