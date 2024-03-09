<?php

namespace App\Imports;

use App\Models\Room;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithUpsertColumns;
use Maatwebsite\Excel\Concerns\WithUpserts;

class RoomImport implements ToModel, WithHeadingRow, WithUpserts, WithUpsertColumns
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $room = new Room([
            'id' => $row[0],
            'name' => $row[1],
            'type' => $row[2],
            'facility' => $row[3],
            'qr_code' => $row[4],
        ]);

        $room->equipments()->sync(explode(",", $row[5]));
        return $room;
    }

    public function headingRow(): int
    {
        return 2;
    }

    public function uniqueBy()
    {
        return 'id';
    }

    public function upsertColumns()
    {
        return ['name', 'type', 'facility', 'qr_code'];
    }
}
