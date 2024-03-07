<?php

namespace App\Exports;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ReportExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Report::with('room', 'equipments', 'media', 'assignment', 'reply', 'reply.media')->get();
    }

    public function map($report): array
    {
        return [
            'id' => $report->id,
            'title' => empty($report->other) ?
                $report->equipments->pluck('name')->join(", ") :
                $report->equipments->pluck('name')->push($report->other)->join(", "),
            'room' => $report->room->name,
            'coSo' => $report->room->facility,
            'description' => $report->description,
//            'media' => $report->media->first(function ($img){
//                return $this->convertToExcelLink(url('/storage/' . $img->path));
//            }),
            'status' => $report->status,
            'worker' => $report->status == ReportStatus::SENT->value ? '' : $report->assignment->worker->name,
//            'complete' => $report->status == ReportStatus::COMPLETE->value ? $report->reply->media->map(function ($img){
//                return $this->convertToExcelLink(url('/storage/' . $img->path));
//            })->join(", ") : '' ,
//            'complete' => $report->status == ReportStatus::COMPLETE->value ? $report->reply->content : '',
            'created_at' => $report->created_at,
            'complete_at' => $report->status == ReportStatus::COMPLETE->value ? $report->reply->created_at : 'Chưa hoàn thành',
            'link' => $this->convertToExcelLink(route('admin.report') . "/$report->id")
        ];
    }

    public function headings(): array
    {
        return [
            'Id',
            'Tiêu đề',
            'Phòng',
            'Cơ sở',
            'Mô tả',
//            'Hình ảnh',
            'Trạng thái',
            'Người xử lý',
            'Tạo lúc',
            'Hoàn thành lúc'
//            'Link báo hỏng'
        ];
    }

    public function convertToExcelLink($url){
        return "=HYPERLINK(\"$url\")";
    }
}
