<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Room;
use App\Models\Reply;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Worker\CompletionReportRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Role;


class CompletionReportController extends Controller
{
    public function index(Request $request)
    {
        // $qrCode = $request->query('id');
        // // Lấy danh sách phòng bằng laravel và trả về
        // $room = Room::find($qrCode);

        // $room = Room::where('qr_code', $request->get('id'))->first();


        // $userEquimentIds = $room->equipments()->select(['id', 'name'])->get()->toArray();

        $StrqrCode = "HjwYjOS0";
        $room = Room::where('qr_code', $StrqrCode)->first();

        $userId = "1";
        $reportId = "3";


        return Inertia::render('Worker/CompletionReportAction', [
            "rooms" => [],
            "roomName" => $room->name,
            'userId' => $userId,
            "reportId" => $reportId,
        ]);
    }
    public function store(CompletionReportRequest $request)
    {
        $validated = $request->validated();

        $user = User::find($validated['users_id']);
        $allowedRoles = Role::whereIn('id', [1, 2])->get();
        $userRoles = $user->roles()->whereIn('id', $allowedRoles->pluck('id'))->get();
        if ($userRoles->isNotEmpty()) {
            $reply = Reply::create($validated);
            $files = $request->file()['photo'];
            $paths = [];
            $i = 1;
            $dir = $this->makeDir();
            foreach ($files as $file) {
                $fileName = $file->storeAs($dir, "img$i" . '_' . $reply->id . '_' . sha1(time()) . '.' . $file->extension());
                $paths[] = [
                    'path' => $fileName,
                    'is_local' => true,
                    'reports_id' => $reply->id // Gán ID của báo cáo
                ];
                $i++;
            }


            $reply->media()->createMany($paths);

            return back()->with('message', 'Đã được thêm vào cơ sở dữ liệu của trường');
        } else {
            return back()->with('error', 'Không thuộc người dùng gửi phản hồi');

        }



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
