import { CameraIcon } from "@heroicons/react/24/outline";
import { Icon } from "@tremor/react";

export default function CameraComponent(props) {

    const takePicture = (e) => {
        // console.log(e.target.files);
        const files = e.target.files;
        if (files.length > 0) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            props.setCapturedImages((prevImages) => [...prevImages, ...newImages]);
  
            props.setData((prevData) => ({
                ...prevData,
                photo: [...(prevData.photo || []), ...e.target.files],
            }));
            
        }
    }

    // const handleFileInputChange = (e) => {
    //     props.setData('images', e.target.files);
    // };

    return (
        <label htmlFor="photo" className={"flex flex-col items-center justify-center min-w-20 min-h-20 w-20 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
        <div className={"flex flex-col items-center justify-center pt-5 pb-5"}>
            <CameraIcon className={"w-6 h-6 text-gray-500"}/>
            <p className={"mt-2 text-xs text-gray-500 dark:text-gray-400"}><span className={"font-semibold"}>Thêm hình</span></p>
        </div>
        <input id="photo"  type="file" className={"hidden"} multiple accept="image/*"onChange={(e) => {
                takePicture(e);
                // handleFileInputChange(e);
            }} />
    </label>

    );
}
