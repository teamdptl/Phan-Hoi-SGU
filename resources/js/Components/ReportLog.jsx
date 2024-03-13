// write a component that display the report log use tremor dialog
import {Button, Dialog, DialogPanel, Callout} from "@tremor/react";
import {RiCloseLine} from "react-icons/ri";
import {displayTime} from "@/Utils/time.js";
export default function ReportLog({logs, isOpen, setIsOpen}) {
    return <>
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            static={true}
            className="z-[100]">
            <DialogPanel className="sm:max-w-md">
                <div className="absolute right-0 top-0 pr-3 pt-3">
                    <button
                        type="button"
                        className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close">
                        <RiCloseLine
                            className="h-5 w-5 shrink-0"
                            aria-hidden={true}
                        />
                    </button>
                </div>
                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Lịch sử báo hỏng
                </h4>
                <div className={"mt-4 space-y-3"}>
                    {logs.map((log, index) => (
                        <Callout title={log.content} color={"gray"} key={index}>
                            {displayTime(log.created_at)}
                        </Callout>
                    ))}
                </div>
            </DialogPanel>
        </Dialog>
    </>
}
