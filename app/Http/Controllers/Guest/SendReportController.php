<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Room\StoreReportRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;



class SendReportController extends Controller
{
    public function index(Request $request)
    {
        $roomId = $request->query('roomId');
        // Lấy danh sách phòng bằng laravel và trả về
        $room = Room::find($roomId);

        $userEquimentIds = $room->equipments()->select(['id', 'name'])->get()->toArray();

        return Inertia::render('Guest/ReportAction', [
            "rooms" => [],
            'userEquimentIds' => $userEquimentIds,
            "roomName" => $room->name,
            "roomId" => $room->id,
        ]);
    }
    public function store(StoreReportRequest $request)
    {
        $validated = $request->validated();
        $idEquipment = $validated['idEquipment'];
        $room = Room::find($validated['roomId']);
        $userEquimentIds = $room->equipments()->pluck('id')->toArray();

        // Kiểm tra xem idEquipment có trong danh sách userEquimentIds không
        if (!in_array($idEquipment, $userEquimentIds)) {
            return back()->with('error', 'Thiết bị không thuộc phòng, vui lòng chọn lại.');
        }

        $report = Report::create($validated);
        $report->equipments()->attach($idEquipment);

        $files = $request->file()['photo'];
        $paths = [];
        $i = 1;
        $dir = $this->makeDir();
        foreach ($files as $file) {
            $fileName = $file->storeAs($dir, "img$i" . '_' . $report->id . '_' . sha1(time()) . '.' . $file->extension());
            $paths[] = [
                'path' => $fileName,
                'is_local' => true,
                'reports_id' => $report->id // Gán ID của báo cáo
            ];
            $i++;
        }


        $report->media()->createMany($paths);

        return back()->with('message', 'Đã được thêm vào cơ sở dữ liệu của trường');
    }

    public function makeDir()
    {
        $now = Carbon::now();
        $dirNameYear = "photos/" . $now->year;
        $dirNameMonth = $dirNameYear . "/" . $now->month;
        // $dirExist = Storage::exists($dirNameYear) ? (Storage::exists($dirNameMonth) ? true : Storage::makeDirectory($dirNameMonth)) : (Storage::makeDirectory($dirNameMonth));
        if (Storage::exists($dirNameYear)) {
            if (!Storage::exists($dirNameMonth))
                Storage::makeDirectory($dirNameMonth);
        } else {
            Storage::makeDirectory($dirNameMonth);
        }
        // echo $dirNameMonth;
        return $dirNameMonth;
    }
}
