import {Button, Card, SearchSelect, SearchSelectItem, Text, Title} from "@tremor/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from 'lightgallery/plugins/video';
import LightGallery from "lightgallery/react";
import ListImgHorizontal from "@/Components/ListImgHorizontal.jsx";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    BarsArrowUpIcon,
    BriefcaseIcon,
    DocumentCheckIcon,
    EyeIcon,
    InformationCircleIcon,
    MapPinIcon
} from "@heroicons/react/24/outline/index.js";
import {displayTime} from "@/Utils/time.js";
import {statusToText} from "@/Utils/status.js";
import {router, usePage} from "@inertiajs/react";
import {facilityToString} from "@/Utils/facility.js";
import {BellIcon, ClockIcon, Cog6ToothIcon, CogIcon, EllipsisHorizontalCircleIcon} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { Badge, BadgeDelta } from '@tremor/react';
import ReportLog from "@/Components/ReportLog.jsx";
import {ADMIN} from "@/Utils/role.js";

// TODO: Thêm auth user admin mới cho hiện các quyền
export default function({report, worker, openCompleteForm}){
    const lightGallery = useRef(null);
    const {auth} = usePage().props;
    const { message } = usePage().props.flash;
    const [workerId, setWorkerId] = useState(report?.assignment ? report.assignment.worker_id : '');
    const url = route('admin.report')+'/'+report.id;
    const [logOpen, setLogOpen] = useState(false);

    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    const openGallery = useCallback((index) => {
        lightGallery.current.openGallery(index);
    }, []);

    const assignWorkerToReport = () => {
        if (workerId){
            router.post(url, {
                workerId: workerId,
                adminId: auth ? auth.user.id : '',
            })
        }
    }

    const ignoreReport = () => {
        Swal.fire({
            title: "Bỏ qua báo cáo",
            text: "Đánh dấu báo cáo này sẽ không được xử lý",
            showDenyButton: true,
            icon: "warning",
            confirmButtonText: "Bỏ qua",
            denyButtonText: `Trở về`,
            confirmButtonColor: "#d33",
            denyButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(url);
            }
        });
    }

    const undoAssign = () => {
        router.put(url);
    }

    return <>
        <div className={"grid lg:grid-cols-2 grid-cols-1"}>
            <div className={"relative"}>
                <img onClick={() => openGallery(0)} className={"object-cover object-center w-full h-96 rounded-lg cursor-pointer"} src={report.media.length > 0 ? '/storage/'+report.media[0].path : '/img/banner.jpg'} alt={"Ảnh báo hỏng"}/>
                <div className={"absolute top-2 right-1 bg-black px-3 py-1 bg-opacity-50 text-gray-100 rounded-lg"}>{report.media.length} hình ảnh</div>
            </div>
            <div className={"lg:mt-0 lg:px-8 px-2 mt-4 relative"}>
                <EllipsisHorizontalCircleIcon onClick={() => setLogOpen(true)} className={"cursor-pointer w-5 h-5 absolute top-2 right-2"}/>
                <Title color="black" className={"mb-1 text-gray-600"}>
                    {report.equipments.map(item => item.name).join(', ') + (report.other ?
                        ( report.equipments.length > 0 ? ', ' + report.other : report.other) : '')}
                </Title>

                <p style={{color: "#979797", fontSize: 14}}>Tạo lúc {displayTime(report.created_at)}</p>
                <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                    <InformationCircleIcon className={"text-gray-600 h-4 w-4 mr-2"}/>
                    Mô tả chi tiết
                </Text>
                <p className={"text-[#716F6F] text-base mt-1"}>
                    {report.description}
                </p>
                <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                    <MapPinIcon className={"text-gray-600h-4 w-4 mr-2"}/>
                    Vị trí
                </Text>
                <p className={"text-[#716F6F] text-base mt-1"}>
                    {report.room.name} ({facilityToString(report.room.facility)})
                </p>
                <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                    <EyeIcon className={"text-gray-600h-4 w-4 mr-2"}/>
                    Trạng thái
                </Text>
                <Badge color={statusToText(report.status)[1]} className={"text-base mt-2"}>
                    {statusToText(report.status)[0]}
                </Badge>

                {report.status === 'sent' &&
                    (
                        <>
                            <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                                <BriefcaseIcon className={"text-gray-600h-4 w-4 mr-2"}/>
                                Nhân viên thực hiện
                            </Text>
                            <SearchSelect value={workerId} onValueChange={(val) => setWorkerId(val)}
                                          className={"mt-2 lg:w-6/12 w-full"} placeholder={"Phân công nhân viên"}>
                                {worker.map(w => (
                                    <SearchSelectItem value={w.id}>{w.name}</SearchSelectItem>
                                ))}
                            </SearchSelect>
                            {auth.role.find(item => item.id === ADMIN) && (
                                <div className={"mt-4 flex gap-4"}>
                                    <Button disabled={workerId === ''} onClick={assignWorkerToReport}>Phân
                                        công</Button>
                                    <Button onClick={ignoreReport} variant={"secondary"}>Bỏ qua</Button>
                                </div>
                            )}
                        </>
                    )
                }

                {report.status === 'process' && (
                    <>
                        <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                            <BriefcaseIcon className={"text-gray-600h-4 w-4 mr-2"}/>
                            Nhân viên thực hiện
                        </Text>
                        <SearchSelect disabled enableClear={false} value={workerId} onValueChange={(val) => setWorkerId(val)}
                                      className={"mt-2 lg:w-6/12 w-full"} placeholder={"Phân công nhân viên"}>
                            {worker.map(w => (
                                <SearchSelectItem value={w.id}>{w.name}</SearchSelectItem>
                            ))}
                        </SearchSelect>
                            <div className={"mt-4 flex gap-4 flex-wrap"}>
                                {openCompleteForm && (
                                    <Button onClick={openCompleteForm}>Hoàn thành</Button>
                                )}

                                {!openCompleteForm && (
                                    <p className={"text-red-500"}>Nhân viên quét QR trước cửa phòng để hoàn thành báo hỏng</p>
                                )}

                                {auth.role.find(item => item.id === ADMIN) && (
                                    <Button onClick={undoAssign} variant={"secondary"}>Hủy phân công</Button>
                                )}
                            </div>
                    </>
                )}

                {report.status === 'complete' && (
                    <>
                        <Text className={"text-gray-600 mt-4 font-semibold flex items-center"}>
                            <DocumentCheckIcon className={"text-gray-600h-4 w-4 mr-2"}/>
                            Hoàn thành
                        </Text>
                        <p className={"text-[#716F6F] text-base mt-1 mb-2"}>{report.reply?.content} - Hoàn thành bởi {worker.find(item => item.id === report.reply?.users_id).name} lúc {displayTime(new Date(report.reply?.created_at))}</p>
                        <ListImgHorizontal
                            isNotRemove={true}
                            capturedImages={report.reply?.media.map(item => '/storage/' + item.path)}/>
                    </>
                )}

                {/*<p className={"text-gray-500 mt-2"}>{message}</p>*/}

            </div>
        </div>
        <LightGallery
            onInit={onInit}
            dynamic
            dynamicEl={report.media.map((img) => ({
                id: img.id,
                src: '/storage/'+ img.path,
                thumb: '/storage/' + img.path,
            }))}
            elementClassNames="custom-classname"
            plugins={[lgZoom, lgVideo, lgThumbnail]}>
        </LightGallery>
        <ReportLog logs={report.logs} isOpen={logOpen} setIsOpen={setLogOpen}/>
    </>
}
