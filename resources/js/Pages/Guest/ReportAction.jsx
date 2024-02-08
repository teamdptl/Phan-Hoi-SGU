import {Button, Card, Divider, Flex, Text, Title} from "@tremor/react";
import AppLayout from "@/Layouts/AppLayout.jsx";
import { useForm } from '@inertiajs/react'
import CameraComponent from "@/Components/CameraComponent";
import ListImgHorizontal from "@/Components/ListImgHorizontal";
import { useEffect, useState } from "react";
import DropDownListDevice from "@/Components/DropDownListDevice";
import { TextInput } from "@tremor/react";
import { Textarea } from "@tremor/react";
import ReCAPTCHA from "react-google-recaptcha";
import InputError from '@/Components/InputError';
import RoomSelectLayout from "@/Layouts/RoomSelectLayout.jsx";



export default function ReportAction(){

    // Mảng chứa hình
    const [capturedImages, setCapturedImages] = useState([]);

    const [selectedValue, setSelectedValue] = useState(""); //Bật tắt input khác

    const { data, setData, post, progress, errors, processing } = useForm({
        photo: null,
        idEquipment: selectedValue,
        other: null,
        description: null,
        rooms_id: '1',
    })

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

    // Đảm bảo rằng data.idEquipment được cập nhật khi selectedValue thay đổi
    useEffect(() => {
    }, [data.idEquipment]);

        useEffect(()=>{
            console.log("Giá trị của images "+data.photo);
            console.log("Giá trị của idEquipment "+data.idEquipment);
            console.log("Giá trị của selectDevice other "+data.other);
            console.log("Giá trị của des "+data.description);

        },[data.idEquipment, data.other, data.photo, data.description, selectedValue]);

    return <>
        <RoomSelectLayout>
            {/*<div className="min-h-64">*/}
            {/*    <div className=" mx-auto  relative" >*/}
            {/*        <div className="h-28 bg-[url('/img/classroom.jpg')] from-cyan-500 to-blue-500 w-full  mx-auto bg-center	">*/}
            {/*            <Flex className="h-full" flexDirection="col" justifyContent="center" alignItems="center" >*/}
            {/*                <Text color="white" className={"font-medium text-xl"}>Phòng C.A401</Text>*/}
            {/*                <hr className="w-36 h-0.5 mt-2 bg-white border-none"/>*/}
            {/*            </Flex>*/}
            {/*        </div>*/}
            {/*        <Flex  justifyContent="center" className="space-x-8 " >*/}
            {/*            <Text color="black" className={"font-medium text-xl mt-5 text-[#4E4E51]"}>Tạo báo hỏng</Text>*/}
            {/*        </Flex>*/}
            {/*        <form onSubmit={submit} enctype="multipart/form-data" method="post">*/}
            {/*            <div className="space-y-2">*/}
            {/*                <Text color="black" className={"font-medium text-lg mx-5 text-[#4E4E51]"}>Hình ảnh thiết bị</Text>*/}
            {/*                /!* <input type="file" value={data.avatar} onChange={e => setData('images', e.target.files[0])} />*/}
            {/*                {progress && (*/}
            {/*                <progress value={progress.percentage} max="100">*/}
            {/*                    {progress.percentage}%*/}
            {/*                </progress>*/}
            {/*                )} *!/*/}
            {/*                <div class="mx-5 mt-5 flex flex-row relative">*/}
            {/*                    <CameraComponent setCapturedImages={setCapturedImages} className={"shrink-0"} setData={setData}/>*/}
            {/*                    <ListImgHorizontal capturedImages={capturedImages} setCapturedImages={setCapturedImages} setData={setData}/>*/}
            {/*                </div> */}
            {/*                <InputError message={errors.photo} className="mt-2 mx-5"/>*/}

            {/*            </div> */}
            {/*            {progress && ( //Thanh tải file*/}
            {/*                <progress value={progress.percentage} max="100" className={"bg-black"}>*/}
            {/*                    {progress.percentage}%*/}
            {/*                </progress>*/}
            {/*            )}*/}
            {/*            <div className="space-y-2 mx-5 mt-5">*/}
            {/*                <Text color="black" className={"font-medium text-lg text-[#4E4E51]" }>Chọn thiết bị</Text>*/}
            {/*                <DropDownListDevice  setData={setData} setSelectedValue={setSelectedValue}/>*/}
            {/*                <InputError message={errors.idEquipment} className="mt-2"/>*/}

            {/*            </div>*/}
            {/*         */}
            {/*                {selectedValue == "4" && (*/}
            {/*                    <div className="space-y-2 mx-5 mt-5">*/}
            {/*                    <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Thiết bị khác</Text>*/}
            {/*                    <TextInput */}
            {/*                        placeholder="Nhập..." */}
            {/*                        onChange={e =>{  setData('other', e.target.value); */}
            {/*                    }}*/}
            {/*                    />*/}
            {/*                   <InputError message={errors.other} className="mt-2"/>*/}

            {/*                    </div>*/}
            {/*                )}*/}
            {/*            <div className="space-y-2 mx-5 mt-5">*/}
            {/*                <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết</Text>*/}
            {/*                <Textarea*/}
            {/*                onChange={(e) => setData('description',e.target.value)}*/}
            {/*                id="description"*/}
            {/*                placeholder="Start typing here..."*/}
            {/*                />*/}
            {/*                <InputError message={errors.description} className="mt-2"/>*/}
            {/*            </div>*/}
            {/*            <div className="space-y-2 mx-5 mt-5">*/}
            {/*                <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Xác nhận bạn không phải robot</Text>*/}
            {/*                <ReCAPTCHA*/}
            {/*                    sitekey="6LcnJ1wpAAAAAObdrHtAzSB_wd-nrT8YhflyW2nu"*/}
            {/*                    onChange={onChange}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <Flex  justifyContent="center" className="space-x-8 mt-6 mb-8" >*/}
            {/*                <button type="submit"   className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Gửi báo cáo</button>*/}
            {/*            </Flex>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*    */}

            {/*</div>*/}

        </RoomSelectLayout>
    </>

}
