import ReCAPTCHA from "react-google-recaptcha";

//Ý nghĩa của từng tham số
//1.captchaRef được khởi tạo ở giao diện và 
//truyền vào Component này và có thể sử dụng 
//để reset captcha cũng như lấy dữ liệu nếu cần
//2.setToken là một state được khởi tạo bên ngoài để khi truyền vào
//có thẻ giúp lưu trữ token của captcha trả về và token đó 
//được dùng để gửi về server và server gửi đến google để google có thể ktr
//nội dung trả về có thuộc tính success và true nếu token hợp lệ và ngược lại
//3.setDisableButton cũng là 1 state truyền hàm này vào để hỗ trợ việc tắt,
//mở thuộc tính disabled của button
export default function MyCaptcha({captchaRef, setToken, setDisableButton}){
    //Xử lý khi captcha được người dùng check
    function onChange(value) {
        setDisableButton(false)
        setToken(value)
        console.log("Captcha value:", value);
    }

    //Xử lý khi captcha hết hạn
    function onExpired() {
        console.log("Captcha hết hạn")
        setDisableButton(true)
        setToken('')
    }
    
    return (
        <ReCAPTCHA
            sitekey={import.meta.env.VITE_APP_SITE_KEY}
            ref={captchaRef}
            onExpired={onExpired}
            onChange={onChange}
        />
    )
}