import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Link} from "@inertiajs/react";
import {Button, Card, Title} from "@tremor/react";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import ReportInfo from "@/Components/ReportInfo.jsx"
import CompleteReportDialog from "@/Pages/Admin/CURD/CompleteReportDialog.jsx";
import {useState} from "react";


export default function({report, worker}){
    const [open, setOpen] = useState(false);
    return <>
        <AdminLayout>
            <div className={"mb-4"}>
                <Link href={"/admin/report"}>
                    <Button icon={ArrowUturnLeftIcon} variant={"light"} className={"mb-4"}>Trở về</Button>
                </Link>
                <Title>Thông tin báo hỏng</Title>
            </div>
            <Card>
                <ReportInfo report={report} worker={worker} openCompleteForm={() => {setOpen(true)}}/>
            </Card>
            <CompleteReportDialog open={open} setOpen={setOpen} report={report}/>
        </AdminLayout>
    </>
}
