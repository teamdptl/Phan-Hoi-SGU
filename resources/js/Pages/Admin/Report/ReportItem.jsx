import {Badge, Card, Text} from "@tremor/react";
import {MapPinIcon} from "@heroicons/react/16/solid/index.js";
import Checkbox from "@/Components/Checkbox";

const dateCreatedFormat = (date)=>{
    return date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}


export default function ({report}){
    const createAt = report.created_at === undefined ? undefined : report.created_at.replace('Z', '')
    console.log(createAt)

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
    return <>
        <Card className={"flex p-3 gap-4 cursor-pointer"}>
            <div className={"flex-none"}>
                <img className={"object-cover w-28 h-28 rounded"} alt={"Ảnh báo cáo"} src={report.media[0] !== undefined ? ("/storage/" + report.media[0].path ) : "https://diennuocnhatlong.vn/uploads/nguyen-nhan-quat-tran-hu.jpg"}/>
            </div>
            <div className={"flex flex-col justify-center w-full h-fit"}>
                <div className={"flex justify-between"}>
                    <p className={"font-medium text-gray-600 line-clamp-1"}>{getNameEquipString()}</p>
                    <Badge className={"text-sm h-fit pt-0"}>{report.status || 'unkown'}</Badge>
                </div>
                <p className={"text-sm text-gray-400"}>Tạo lúc {dateCreatedFormat(createAt !== undefined ? new Date(createAt) : new Date())}</p>
                <p className={"border-l-2 border-l-gray-500 text-sm pl-2 text-gray-700 mt-2 line-clamp-1"}>{report.description || 'Mô tả chi tiết'}</p>
                <div className={"mt-2 text-sm inline-flex justify-start items-center"}>
                    <MapPinIcon className={"h-4 w-4 text-gray-500 mr-2"}/>
                    <p class="w-full line-clamp-1">{getRoomNameString()}</p>
                </div>
            </div>
        </Card>
    </>
}
