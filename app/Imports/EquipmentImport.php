<?php

namespace App\Imports;

use App\Models\Equipment;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithUpsertColumns;
use Maatwebsite\Excel\Concerns\WithUpserts;

class EquipmentImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        $row = array_values($row);
        $equipment = Equipment::find($row[0]);
        if ($equipment){
            $equipment->types_id = $row[3];
            $equipment->update([
                "name" => $row[1],
                "description" => $row[2],
            ]);
        }
        else {
            $equipment = new Equipment([
                "name" => $row[1],
                "description" => $row[2],
            ]);
            $equipment->types_id = $row[3];
            $equipment->id = $row[0];
            $equipment->save();
        }

        return $equipment;
    }

    public function headingRow(): int
    {
        return 1;
    }

    public function uniqueBy()
    {
        return 'id';
    }

    public function upsertColumns()
    {
        return ['name', 'description', 'types_id'];
    }
}
