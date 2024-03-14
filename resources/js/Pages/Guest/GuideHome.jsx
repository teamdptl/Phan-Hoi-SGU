import AppLayout from "@/Layouts/AppLayout.jsx";
import {
    Divider,
    Text,
    Flex
} from "@tremor/react";




export default function GuideHome({}){
    return <>
         <AppLayout>
         <div className={"min-h-64"}>
            <div className={"max-w-6xl mx-auto my-4 relative"}>
                    <img src={"/img/banner.jpg"} className={"brightness-90 h-48 md:h-64 lg:h-96 w-11/12 mx-auto object-cover object-top rounded-lg"}
                         alt={"Hình ảnh trường"} />
            </div>
                <Text className={"text-center text-xl text-blue-500 font-medium"}>Phản hồi cơ sở vật chất</Text>
                <Divider className={"lg:max-w-5xl my-4 max-w-sm"}/>
                <Flex justifyContent={"center"} flexDirection={"col"}>
                    <p className="font-bold text-xl">Hướng dẫn sử dụng</p>
                </Flex>
            <div className=" justify-center items-center my-5">
                {/* Left side with images */}
                <p className="font-bold mx-2 my-8 lg:mx-10">1. Hướng dẫn tạo báo cáo</p>
                <div className="flex flex-col justify-center items-center">
                    {/* Image 1 */}
                    <div className="flex items-center mb-4">
                        <img src="img/demoGuide.png" alt="Step 1" className="brightness-95 sm:h-10  md:h-10 lg:h-full w-9/12 mx-auto object-cover  rounded-lg " />
                    </div>
                
                </div>
                <p className="font-bold mx-2 my-8 lg:mx-10">2. Hướng dẫn tạo đánh giá</p>
                <div className="flex flex-col justify-center items-center">
                    {/* Image 1 */}
                    <div className="flex items-center mb-4">
                        <img src="img/demoGuide2.png" alt="Step 1" className="brightness-95 sm:h-10  md:h-10 lg:h-full w-9/12 mx-auto object-cover  rounded-lg " />
                    </div>
                
                </div>
            </div>
        </div>
         </AppLayout>
    </>


}