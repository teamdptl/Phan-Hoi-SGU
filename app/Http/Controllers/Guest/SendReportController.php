<?php

namespace App\Http\Controllers\Guest;
use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Room\StoreReportRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;



class SendReportController extends Controller
{
    public function index(){
        // Lấy danh sách phòng bằng laravel và trả về

        return Inertia::render('Guest/ReportAction', [
            "rooms" => [],
        ]);
    }

    public function store(StoreReportRequest $request){
        $validated = $request->validated();

        $report = Report::create($validated);

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
        
        return "Success";
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
