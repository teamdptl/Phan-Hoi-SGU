<?php

namespace App\Http\Controllers\Worker;

use App\Enums\ReportStatus;
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

        $room = Room::where('qr_code', $request->get('id'))->first();
        $report = Report::with(['room', 'media', 'assignment', 'reply', 'equipments'])->find($request->get('reports_id'));

        if ($room && $report && $report->status === ReportStatus::PROCESS->value){
            $exist = $room->reports->first(function ($item) use ($report) {
                return $item->id == $report->id;
            });

            $allow = $request->user()->jobs->first(function ($item) use ($report) {
                return $item->reports_id == $report->id;
            });

            if ($exist && ($allow || $request->user()->isAdmin())){
                return Inertia::render('Worker/CompletionReportAction', [
                    "report" => $report,
                    "qrCode" => $room->qr_code
                ]);
            }
        }

        return Inertia::render('Guest/RoomError');
    }


    public function store(CompletionReportRequest $request)
    {
        $validated = $request->validated();

        $room = Room::where('qr_code', $request->get('qrId'))->first();
        $report = Report::with(['room', 'media', 'assignment', 'reply', 'equipments'])->find($request->get('reports_id'));

        if ($room && $report && $report->status === ReportStatus::PROCESS->value){
            $exist = $room->reports->first(function ($item) use ($report) {
                return $item->id == $report->id;
            });

            $allow = $request->user()->jobs->first(function ($item) use ($report) {
                return $item->reports_id == $report->id;
            });

            if ($exist && ($allow || $request->user()->isAdmin())){
                if ($request->user()->isAdmin()){
                    $assignUserId = $report->assignment->worker_id;
                    $reply = Reply::create([
                        ...$validated,
                        'users_id' => $assignUserId,
                    ]);
                } else {
                    $reply = Reply::create([
                        ...$validated,
                        'users_id' => $request->user()->id,
                    ]);
                }

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
                $report->status = ReportStatus::COMPLETE;
                $report->save();
                if ($request->user()->isAdmin()){
                    return back()->with('message', 'Đã xác nhận hoàn thành báo cáo');
                }
                return to_route('room.select', ['id' => $request->get('qrId')]);
            }
        }
        return back()->with('error', 'Có lỗi trong quá trình gửi phản hồi');

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
