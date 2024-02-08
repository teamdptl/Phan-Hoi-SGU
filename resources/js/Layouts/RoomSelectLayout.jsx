import React, {useState} from "react";
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Button, Flex, Text, Textarea, TextInput} from "@tremor/react";
import CameraComponent from "@/Components/CameraComponent.jsx";
import ListImgHorizontal from "@/Components/ListImgHorizontal.jsx";
import InputError from "@/Components/InputError.jsx";
import DropDownListDevice from "@/Components/DropDownListDevice.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import {useForm} from "@inertiajs/react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star.js";
import Box from "@mui/material/Box";
import MyCaptcha from "@/Components/MyCaptcha.jsx";
import AlertModal from "@/Components/AlertModal.jsx";

export default function (){
    const [capturedImages, setCapturedImages] = useState([]);

    const [selectedValue, setSelectedValue] = useState(""); //Bật tắt input khác

    const { data, setData, post, progress, errors, processing } = useForm({
        photo: null,
        idEquipment: selectedValue,
        other: null,
        description: null,
        rooms_id: '1',
    })

    return <AppLayout>
        <div className="min-h-64">
            <div className=" mx-auto  relative">
                <div
                    className="h-28 bg-[url('/img/classroom.jpg')] from-cyan-500 to-blue-500 w-full  mx-auto bg-center	">
                    <Flex className="h-full" flexDirection="col" justifyContent="center" alignItems="center">
                        <Text color="white" className={"font-medium text-xl"}>Phòng C.A401</Text>
                        <hr className="w-36 h-0.5 mt-2 bg-white border-none"/>
                    </Flex>
                </div>
                <Flex justifyContent="center" className="space-x-8 ">
                    <Text color="black" className={"font-medium text-xl mt-5 text-[#4E4E51]"}>Tạo báo hỏng</Text>
                </Flex>
                <form encType="multipart/form-data" method="post">
                    <div className="space-y-2">
                        <Text color="black" className={"font-medium text-lg mx-5 text-[#4E4E51]"}>Hình ảnh thiết
                            bị</Text>
                        {/* <input type="file" value={data.avatar} onChange={e => setData('images', e.target.files[0])} />
                            {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                            )} */}
                        <div className="mx-5 mt-5 flex flex-row relative">
                            <CameraComponent setCapturedImages={setCapturedImages} className={"shrink-0"}
                                             setData={setData}/>
                            <ListImgHorizontal capturedImages={capturedImages} setCapturedImages={setCapturedImages}
                                               setData={setData}/>
                        </div>
                        <InputError message={errors.photo} className="mt-2 mx-5"/>

                    </div>
                    {progress && ( //Thanh tải file
                        <progress value={progress.percentage} max="100" className={"bg-black"}>
                            {progress.percentage}%
                        </progress>
                    )}
                    <div className="space-y-2 mx-5 mt-5">
                        <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Chọn thiết bị</Text>
                        <DropDownListDevice setData={setData} setSelectedValue={setSelectedValue}/>
                        <InputError message={errors.idEquipment} className="mt-2"/>

                    </div>

                    {selectedValue == "4" && (
                        <div className="space-y-2 mx-5 mt-5">
                            <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Thiết bị khác</Text>
                            <TextInput
                                placeholder="Nhập..."
                                onChange={e => {
                                    setData('other', e.target.value);
                                }}
                            />
                            <InputError message={errors.other} className="mt-2"/>

                        </div>
                    )}
                    <div className="space-y-2 mx-5 mt-5">
                        <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Mô tả chi tiết</Text>
                        <Textarea
                            onChange={(e) => setData('description', e.target.value)}
                            id="description"
                            placeholder="Start typing here..."
                        />
                        <InputError message={errors.description} className="mt-2"/>
                    </div>
                    <div className="space-y-2 mx-5 mt-5">
                        <Text color="black" className={"font-medium text-lg text-[#4E4E51]"}>Xác nhận bạn không phải
                            robot</Text>
                        <ReCAPTCHA
                            sitekey="6LcnJ1wpAAAAAObdrHtAzSB_wd-nrT8YhflyW2nu"
                        />
                    </div>
                    <Flex justifyContent="center" className="space-x-8 mt-6 mb-8">
                        <button type="submit"
                                className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"}>Gửi báo cáo
                        </button>
                    </Flex>
                </form>
            </div>
        </div>

        {/*<div className="md:flex xl:px-32 md:px-8 md:py-5">*/}
        {/*    <div className="relative md:w-7/12 lg:w-2/3">*/}
        {/*        <img className="object-cover h-full" src="/img/classroom.jpg"></img>*/}
        {/*        <div className="absolute top-0 left-0 bottom-0 right-0 justify-center items-center flex">*/}
        {/*            <div className="text-white font-bold text-2xl w-fit">*/}
        {/*                <p>Phòng C.E403</p>*/}
        {/*                <div className="border-2"></div>*/}
        {/*            </div>*/}

        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex flex-col justify-center items-center px-5 md:w-5/12 lg:w-1/3 h-full">*/}
        {/*        <p className="font-semibold text-2xl w-fit">Đánh giá phòng</p>*/}
        {/*        <div className="mt-5 flex flex-col items-center justify-center">*/}
        {/*            <Rating*/}
        {/*                name="hover-feedback"*/}
        {/*                value={value}*/}
        {/*                getLabelText={getLabelText}*/}
        {/*                onChange={(event, newValue) => {*/}
        {/*                    setValue(newValue);*/}
        {/*                }}*/}
        {/*                size="large"*/}
        {/*                onChangeActive={(event, newHover) => {*/}
        {/*                    console.log("Hover :" + hover)*/}
        {/*                    setHover(newHover);*/}
        {/*                }}*/}
        {/*                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}*/}
        {/*            />*/}
        {/*            {value !== null && (*/}
        {/*                <Box>{labels[hover !== -1 ? hover : value]}</Box>*/}
        {/*            )}*/}
        {/*        </div>*/}
        {/*        <div className="w-full items-start mt-5">*/}
        {/*            <p>Mô tả chi tiết</p>*/}
        {/*            <Textarea value={text} onChange={(e) => setText(e.target.value)} class="rounded-xl w-full"*/}
        {/*                      rows={3}></Textarea>*/}
        {/*        </div>*/}
        {/*        <div className="w-full items-start mt-5 mb-10">*/}
        {/*            <p className="italic font-sans text-sm w-fit">Xác nhận bạn không phải robot*</p>*/}
        {/*            <MyCaptcha captchaRef={captchaRef} setToken={setToken} setDisableButton={setDisable}/>*/}
        {/*        </div>*/}

        {/*        <Button disabled={disable} onClick={submitRating}>Đánh giá</Button>*/}

        {/*    </div>*/}
        {/*    <AlertModal isOpen={modal} onClose={() => setModal(false)} icon={icon} contentTitle={titleContent}*/}
        {/*                description={description} button={buttons}/>*/}

        {/*</div>*/}
    </AppLayout>
}
