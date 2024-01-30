import React, {createContext, useState} from "react";
import { Button, Dialog, DialogPanel, Title } from "@tremor/react";

export const DialogContext = createContext();

export default function DialogProvider ({children}){
    const [isOpen, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        header: '',
        body: '',
        onConfirm: () => {},
        onClose: () => {},
    })

    const openDialog = (header, body, onConfirm, onClose) => {
        setOpen(true);
        setDialogContent({
            header: header,
            body: body,
            onConfirm: onConfirm,
            onClose: onClose
        });
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const contextValue = {
        openDialog,
        closeDialog,
    };

    return <>
        <DialogContext.Provider value={contextValue}>
            {children}
            <Dialog open={isOpen} onClose={dialogContent.onClose} static={true}>
                <DialogPanel>
                    <Title className="mb-3">{dialogContent.header}</Title>
                    {dialogContent.body}
                    <div className="mt-3">
                        <Button onClick={dialogContent.onClose}>
                            Đóng
                        </Button>
                        <Button onClick={dialogContent.onConfirm}>
                            Xác nhận
                        </Button>
                    </div>
                </DialogPanel>
            </Dialog>
        </DialogContext.Provider>
    </>
}
