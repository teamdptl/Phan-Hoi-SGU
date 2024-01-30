import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@tremor/react";
import { useRef, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";



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

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  function verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!! 
    console.log(recaptchaToken, "<= your recaptcha token")
 }
  
export default function CreateRating(){
    const [value, setValue] = useState(2)
    const [hover, setHover] = useState(-1)
    const key = "6Ld17l0pAAAAANV-XzcvvPBMGY202eCmxDyjduik"
    const captchaRef = useRef(null)
    function submitRating() {
        // e.preventDefault();
        const token = captchaRef.current.getValue();
        console.log(token, "<= your recaptcha token")
        const secretKey = "6Ld17l0pAAAAAJNhNbKjDPx15ze-xd-_LxqgkI5O"
        const url = `http://localhost:8000/guest/rating/create`
        
        fetch(url,
            {
                method: 'POST',
                data:{
                    token: token,
                    secretKey: secretKey
                }
            }
        ).then(res => {
            console.log(res)
            return res;
        })
        .then((json) => console.log(json))
        .catch(err => console.error(err));
        console.log(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`)
        captchaRef.current.reset();

    }


    return (
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
                        <textarea class="w-full" rows={3}></textarea>
                    </div>
                    <div class="w-full items-start mt-5 mb-10">
                        <p class="italic font-sans text-sm w-fit">Xác nhận bạn không phải robot*</p>
                        <ReCAPTCHA
                            sitekey={key}
                            ref={captchaRef}
                        />
                    </div>

                    <Button onClick={submitRating}>Đánh giá</Button>
                    
                </div>
            </div>
        </AppLayout>
    )
}