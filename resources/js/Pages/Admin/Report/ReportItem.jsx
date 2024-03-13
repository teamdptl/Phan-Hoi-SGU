import {Badge, Card, Text} from "@tremor/react";
import {MapPinIcon} from "@heroicons/react/16/solid/index.js";
import Checkbox from "@/Components/Checkbox";
import {statusToText} from "@/Utils/status.js";
import {router, usePage} from "@inertiajs/react";
import {ADMIN} from "@/Utils/role.js";
import { useLongPress } from "@uidotdev/usehooks";
import { useState } from "react";

const dateCreatedFormat = (date)=>{
    return date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}


export default function ({listReport, setListReport, reportParam, openReport, openCheckBox ,setOpenCheckBox, longPress}){
    const {auth} = usePage().props;
    const createAt = reportParam.created_at === undefined ? undefined : reportParam.created_at.replace('Z', '')
    const [report, setReport] = useState(reportParam)
    
    const getNameEquipString = () => {
        let name = ''
        if(report.other){
            name += report.other
        }

        if(report.equipments.length > 0){
            name += (name === '' ? '' : ', ') + report.equipments.map(equip => equip.name).join(', ')
        }

        if(name === ''){
            name = 'Báo hỏng'
        }
        return name
    }

    const getRoomNameString = () => {
        let roomName = ''
        if(report.room.name){
            roomName += report.room.name
        }

        switch(report.room.facility){
            case 'c':
                roomName += ' (Cơ sở chính)';
                break;
            case '1':
                roomName += ' (Cơ sở 1)';
                break;
            case '2':
                roomName += ' (Cơ sở 2)';
                break;
            default:
                break;
        }

        return roomName
    }

    // const handleClick = () => {
    //     const isAdmin = auth.role?.findIndex(item => item.id === ADMIN) >= 0;
    //
    //     if (isAdmin){
    //         router.get(route('admin.report') + '/' + report.id);
    //     }
    // }

    const attrs = useLongPress(
        (e) => {
            setOpenCheckBox(true);
            setReport({...report, isChecked : true})
            const newList = listReport.map((item) =>{
                if(item.id === report.id) {
                    return {...item, isChecked: true};
                }
                return item;
            })
            setListReport(newList)
        },
        {
          onStart: (event) => console.log("Press started"),
          onFinish: (event) => console.log("Press Finished"),
          onCancel: (event) => console.log("Press cancelled"),
          threshold: 500,
        }
      );

    const handleChangeCheckbox = (event) =>{
        setReport({...report, isChecked : event.target.checked})
        const newList = listReport.map((item) =>{
            if(item.id === report.id) {
                return {...item, isChecked: event.target.checked};
            }
            return item;
        })
        setListReport(newList)
    }

      console.log(report)

    return <>
        <Card className={"flex p-3 gap-4 cursor-pointer" + (report.isChecked ? " opacity-75" : " ")} onClick={e => openReport(e)} {...attrs} >
            <div className={"flex-none"}>
                <img className={"object-cover w-28 h-28 rounded"} alt={"Ảnh báo cáo"} src={report.media[0] !== undefined ? ("/storage/" + report.media[0].path ) : "https://diennuocnhatlong.vn/uploads/nguyen-nhan-quat-tran-hu.jpg"}/>
            </div>
            <div className={"flex flex-col justify-center w-full h-fit"}>
                <div className={"flex justify-between"}>
                    <p className={"font-medium text-gray-600 line-clamp-1"}>{getNameEquipString()}</p>
                    <Badge className={"text-sm h-fit pt-0"} color={statusToText(report.status)[1]}>{statusToText(report.status)[0]}</Badge>
                </div>
                <p className={"text-sm text-gray-400"}>Tạo lúc {dateCreatedFormat(createAt !== undefined ? new Date(createAt) : new Date())}</p>
                <p className={"border-l-2 border-l-gray-500 text-sm pl-2 text-gray-700 mt-2 line-clamp-1"}>{report.description || 'Mô tả chi tiết'}</p>
                <div className={"mt-2 text-sm inline-flex justify-start items-center"}>
                    <MapPinIcon className={"h-4 w-4 text-gray-500 mr-2"}/>
                    <p class="w-full line-clamp-1">{getRoomNameString()}</p>
                </div>
            </div>
            { openCheckBox &&
                <Checkbox className="absolute bottom-3 right-3" checked={report.isChecked} onClick={e => handleChangeCheckbox(e)}></Checkbox>
            }
        </Card>
    </>
}
