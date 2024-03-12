<?php

namespace App\Exports;

use App\Models\Equipment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EquipmentExport implements FromCollection,  WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Equipment::all();
    }

    public function headings(): array
    {
        return [
            'Id',
            'Tên thiết bị',
            'Mô tả',
            'Loại thiết bị',
            'Tạo lúc'
        ];
    }

    public function map($equipment): array
    {
        return [
            $equipment->id,
            $equipment->name,
            $equipment->description,
            $equipment->types_id,
            $equipment->created_at
        ];
    }
}
