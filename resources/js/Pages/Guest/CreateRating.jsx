import AppLayout from "@/Layouts/AppLayout";
import { Button, Textarea } from "@tremor/react";
import { useRef, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { router, useForm } from "@inertiajs/react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Modal from "@/Components/Modal";
import MyCaptcha from "@/Components/MyCaptcha";


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  
export default function CreateRating(){
    const [value, setValue] = useState(2) //Lưu giá trị (số sao) được người dùng đánh giá
    const [hover, setHover] = useState(-1) //Giá trị sao tạm để tạo hiệu ứng khi người dùng hover
    const [text, setText] = useState('') //Chứa nội dung mà người dùng đánh giá
    const [disable, setDisable] = useState(true) //Dùng để cho phép người dùng có thể click vào button gửi đánh giá
    const key = "6Ld17l0pAAAAANV-XzcvvPBMGY202eCmxDyjduik"
    const [token, setToken] = useState('')//Lưu token được trả về từ google recaptcha
    const [modal, setModal] = useState(false) //Dùng để tắt mở modal thông báo cho người dùng
    const [sendSuccess, setSendSuccess] = useState() //Lưu trạng thái khi gửi đánh giá
    const captchaRef = useRef(null)


    //Xử lý và gửi dữ liệu xuống server
    function submitRating() {
        // e.preventDefault();
        // const token = captchaRef.current.getValue();
        const url = '/guest/rating/create'
        router.post(url, {'token': token, 'star': value, 'text': text}, {
            onSuccess: (data) => {
                console.log(data)
                setModal(true)
                if(data.props.success){
                    setSendSuccess(true)
                }else{
                    setSendSuccess(false)
                    captchaRef.current.reset();
                    setDisable(true)
                }
                
            },
            onError: (err) => {
                alert("Server Internal Error!")
            }
        });

    }


    return (
        <>
        <AppLayout>
            <div class="md:flex xl:px-32 md:px-8 md:py-5">
                <div class="relative md:w-7/12 lg:w-2/3">
                    <img src="/img/classroom.jpg"></img>
                    <div class="absolute top-0 left-0 bottom-0 right-0 justify-center items-center flex">
                        <div class="text-white font-bold text-2xl w-fit">
                            <p>Phòng C.E403</p>
                            <div class="border-2"></div>
                        </div>
                        
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center px-5 md:w-5/12 lg:w-1/3 h-full">
                    <p class="font-semibold text-2xl w-fit">Đánh giá phòng</p>
                    <div class="mt-5 flex flex-col items-center justify-center">
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5} 
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
                    <div class="w-full items-start mt-5">
                        <p>Mô tả chi tiết</p>
                        <Textarea value={text} onChange={(e) => setText(e.target.value)} class="rounded-xl w-full" rows={3}></Textarea>
                    </div>
                    <div class="w-full items-start mt-5 mb-10">
                        <p class="italic font-sans text-sm w-fit">Xác nhận bạn không phải robot*</p>
                        <MyCaptcha captchaRef={captchaRef} setToken={setToken} setDisableButton={setDisable} />
                    </div>

                    <Button disabled={disable} onClick={submitRating}>Đánh giá</Button>
                    
                </div>
                <Modal show={modal} onClose={() => setModal(false)} maxWidth="xl">
                    <div class="px-5 py-4 sm:py-8 flex flex-col justify-start items-center">
                        
                        {sendSuccess ? (
                            <>
                                <FaCircleCheck class="size-16 text-green-600"/>
                            </>
                        ):(
                            <>
                                <IoMdCloseCircleOutline class="size-16 text-red-600"/>
                            </>
                        )}
                        
                        <div class="flex flex-col justify-center items-center">{sendSuccess ? 
                            (<>
                                <p class="font-bold mt-2">Đã gửi đánh giá của bạn!</p>
                            </>)
                            : 
                            (<>
                                <p class="font-bold">Không thể gửi đánh giá :(((</p>
                                <p class="mt-4">Mã xác thực của bạn đã hết hạn!<br/> Hãy check vào ô để xác nhận không phải người máy</p>
                            </>)}</div>       
                        
                        
                        <div class="w-full pt-8 flex justify-center items-center">
                            {
                                sendSuccess ? (
                                    <>
                                        <button class="px-10 font-bold hover:opacity-30 text-white bg-green-600 py-2 rounded-lg">Đi xem</button>
                                    </>
                                ) : (
                                    <>
                                        <button class="px-10 font-bold hover:opacity-30 text-white bg-green-600 py-2 rounded-lg">Đồng ý</button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    
                </Modal>

            </div>
        </AppLayout>
        </>

    )
}