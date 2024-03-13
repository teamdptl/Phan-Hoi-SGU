<?php

namespace App\Imports;

use App\Models\Room;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithUpsertColumns;
use Maatwebsite\Excel\Concerns\WithUpserts;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

HeadingRowFormatter::default('none');
class RoomImport implements ToModel, WithUpserts, WithHeadingRow, WithUpsertColumns
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    // Một thế lực bí ẩn nào đó đã làm chọ đoạn code này méo chạy dc, mặc dù 5s trước vẫn ngon lành :)
    public function model(array $row)
    {
        $row = array_values($row);

        $room = Room::find($row[0]);
        if ($room){
            $room->update([
                "name" => $row[1],
                "type" => $row[2],
                "facility" => $row[3],
                "qr_code" => $row[4],
            ]);
        }
        else {
            $room = new Room([
                'name' => $row[1],
                'type' => $row[2],
                'facility' => $row[3],
                'qr_code' => $row[4],
            ]);
            $room->id = $row[0];
            $room->save();
        }

        $room->equipments()->syncWithPivotValues(explode(",", $row[5]), ['status' => 'Đang sử dụng']);
        return $room;
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
        return ['name', 'type', 'facility', 'qr_code'];
    }
}
