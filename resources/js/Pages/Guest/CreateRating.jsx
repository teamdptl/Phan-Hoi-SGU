import AppLayout from "@/Layouts/AppLayout";
import { Button, Textarea, Flex, Text } from "@tremor/react";
import { useRef, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import MyCaptcha from "@/Components/MyCaptcha";
import AlertModal from "@/Components/AlertModal";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import { router, usePage, useForm, Link} from "@inertiajs/react";


const labels = {
    1: 'Rất kém',
    2: 'Tệ',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Rất tốt',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  
export default function CreateRating({roomName, qrCode}){
    const [value, setValue] = useState(2) //Lưu giá trị (số sao) được người dùng đánh giá
    const [hover, setHover] = useState(-1) //Giá trị sao tạm để tạo hiệu ứng khi người dùng hover
    const [text, setText] = useState('') //Chứa nội dung mà người dùng đánh giá
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá
    const key = "6Ld17l0pAAAAANV-XzcvvPBMGY202eCmxDyjduik"
    const [token, setToken] = useState('')//Lưu token được trả về từ google recaptcha
    const [sendSuccess, setSendSuccess] = useState() //Lưu trạng thái khi gửi đánh giá
    const captchaRef = useRef(null)


    //Các biến dùng cho Modal để hiển thị thống báo cho người dùng
    const [modal, setModal] = useState(false) //Dùng để tắt mở modal thông báo cho người dùng
    const [icon, setIcon] = useState(<div></div>)
    const [titleContent, setTitleContent] = useState('')
    const [description, setDescription] = useState('')
    const [buttons, setButtons] = useState(<button></button>)
    //Xử lý và gửi dữ liệu xuống server
    function submitRating() {
        
        const url = '/gui-danh-gia'
        router.post(url, {'token': token, 'rating': value, 'y_kien': text, 'rooms_id': 2}, {
            onSuccess: (data) => {
                console.log(data)
                if(data.props.success){
                    if(data.props.insertRating){
                        setIcon(<FaCircleCheck class="size-16 text-green-600"/>)
                        setTitleContent("Thành công!")
                        setDescription("Đã gửi đánh giá của bạn!")
                        setButtons(
                        <>
                            <button class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Đi xem</button>
                        </>)
                    }else{
                        setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                        setTitleContent("Thất bại!")
                        setDescription("Lỗi server! Không thể lưu đánh giá!")
                        setButtons(
                        <>
                            <button class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Làm mới trang</button>
                        </>)
                    }
                    
                }else{
                    setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                    setTitleContent("Thất bại!")
                    setDescription("Hãy check vào captcha để xác thực!")
                    setButtons(
                        <>
                            <button onClick={() => setModal(false)} class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Được</button>
                        </>
                    )
                    captchaRef.current.reset();
                    setDisable(true)
                }
                setModal(true)
            },
            onError: (err) => {
                console.log(err)
                if(err.y_kien !== undefined){
                    setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                    setTitleContent("Thất bại!")
                    setDescription(err.y_kien)
                    setButtons(
                        <>
                            <button onClick={() => setModal(false)} class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Được</button>
                        </>
                    )
                }else{
                    if(err.rating !== undefined){
                        setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                        setTitleContent("Thất bại!")
                        setDescription(err.rating)
                        setButtons(
                            <>
                                <button onClick={() => setModal(false)} class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Được</button>
                            </>
                        )
                    }else{
                        if(err.token !== undefined){
                            setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                            setTitleContent("Thất bại!")
                            setDescription(err.token)
                            setButtons(
                                <>
                                    <button onClick={() => setModal(false)} class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Được</button>
                                </>
                            )
                        }else{
                            setIcon(<IoMdCloseCircleOutline class="size-16 text-red-600"/>)
                            setTitleContent("Thất bại!")
                            setDescription("Server internal error")
                            setButtons(
                                <>
                                    <button onClick={() => setModal(false)} class="px-10 font-bold hover:opacity-30 text-white bg-blue-600 py-2 rounded-lg">Được</button>
                                </>
                            )
                        }
                        
                    }
                }
                setModal(true)
            }
        });

    }


    return (
        <>
        <AppLayout>
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
                <div className={"mt-3"}>
                <Link href={route('room.select') + `?id=${qrCode}`} method="get" className="mx-5">
                    <Button icon={ArrowUturnLeftIcon} variant={"light"}>Trở về</Button>
                </Link>
                    <Flex justifyContent="center"  className="space-x-8 mb-4 " >
                        <Text color="black" className={"font-medium text-xl  text-[#4E4E51]"}>Đánh giá phòng</Text>
                    </Flex>
                    </div>
                    <div class="mt-5 flex flex-col items-center justify-center">
                        <Rating
                            name="hover-feedback"
                            value={value}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                            size="large"
                            onChangeActive={(event, newHover) => {
                                console.log("Hover :" + hover)
                            setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </div>
                    <div className="space-y-2 mx-5 mt-5">
                        <Text color="black" className={"font-medium text-lg text-[#4E4E51]" }>Mô tả chi tiết</Text>
                        <Textarea placeholder="Nhập mô tả..." value={text} onChange={(e) => setText(e.target.value)} rows={3}></Textarea>
                    </div>
                    <div className="space-y-2 mx-5 mt-5">
                        {/* <p class="italic font-sans text-sm w-fit">Xác nhận bạn không phải robot*</p> */}
                        <MyCaptcha captchaRef={captchaRef} setToken={setToken} setDisableButton={setDisable} />
                    </div>
                    <Flex  justifyContent="center" className="space-x-8 mt-6 mb-8" >
                    <Button disabled={disable} onClick={submitRating}>Đánh giá</Button>
                    </Flex>

                </div>
                <AlertModal isOpen={modal} onClose={() => setModal(false)} icon={icon} contentTitle={titleContent} description={description} button={buttons}/>

            </div>
        </AppLayout>
        </>

    )
}