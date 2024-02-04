import Modal from "@/Components/Modal";

export default function AlertModal({isOpen = false, onClose = () => {}, icon, contentTitle = "Thông báo!", description = '', button}){

    return(
        <Modal show={isOpen} onClose={onClose} maxWidth="xl">
            <div class="px-5 py-4 sm:py-8 flex flex-col justify-start items-center">

                {icon}               
                
                <div class="flex flex-col justify-center items-center">                    
                        <p class="font-bold mt-2">{contentTitle}</p>
                        <p class="mt-4">{description}</p>
                </div>       
                
                <div class="w-full pt-8 flex justify-evenly items-center">
                    { button }
                </div>
            </div>
            
        </Modal>
    )
}