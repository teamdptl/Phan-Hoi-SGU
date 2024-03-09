<?php

namespace App\Exports;

use App\Models\Room;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RoomExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Room::with(['reports', 'reviews', 'equipments'])->get();
    }

    public function headings(): array
    {
        return [
            'Id phòng',
            'Tên phòng',
            'Loại phòng',
            'Cơ sở',
            'QR Link',
            'Id thiết bị',
            'Ngày tạo',
            'Báo hỏng',
            'Đánh giá'
        ];
    }

    public function map($room): array
    {
        return [
            $room->id,
            $room->name,
            $room->type,
            $room->facility,
            $room->qr_code,
            $room->equipments->pluck('id')->join(","),
            $room->created_at,
            $room->reports->count() . ' báo hỏng',
            $room->reviews->avg('rating') . '('.$room->reviews->count().' lượt)',
        ];
    }
}
