<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReportStatus;
use App\Exports\ReportExport;
use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index(Request $request){
        $currentDateTime = date('Y-m-d');
        $currentDateTimeString = date('Y-m-d', strtotime($currentDateTime . '+1 day'));
        $lastMonthDateTimeString = date('Y-m-d',strtotime($currentDateTime .'-1 month'));
        $searchText = $request->input('searchText') ?? '';
        $from = $request->input('from',$lastMonthDateTimeString);
        $to = $request->input('to', $currentDateTimeString);

        $facility = $request->input('facility', '');
        $status = $request->input('status', '');
        $arrange = $request->input('sortType', 'asc');

        // dd($searchText, $from, $to, $facility, $arrange);

        $reports = Report::with('room', 'equipments', 'media')
        ->where(function($query) use ($searchText){
            $query->whereHas('equipments', function ($query) use ($searchText){
                $query->where('name', 'like','%'. $searchText .'%');
            })
            ->orWhere('description', 'like','%'. $searchText .'%')
            ->orWhere('other', 'like','%'. $searchText .'%')
            ->orWhereHas('room', function ($query) use ($searchText){
                $query->where('name', 'like','%'. $searchText .'%');
            });
        })
        ->where('created_at', '>=', $from)
        ->where('created_at', '<=', $to)
        ->orderBy('created_at', $arrange);

        if($status != ''){
            $reports = $reports->where('status', $status);
        }

        if($facility != ''){
            $reports = $reports->whereHas('room', function ($query) use($facility){
                $query->where('facility', $facility);
            });
        }

        $reports = $reports->paginate(2);

        return Inertia::render('Admin/Report', [
            'reports' => $reports->items(),
            'currentPage' => $reports->currentPage(),
            'lastPage' => $reports->lastPage(),
            'first'=>  $reports->firstItem(),
            'last'=> $reports->lastItem(),
            'total' => $reports->total(),
            'search' => $request->input('searchText'),
            'from' => $from,
            'to' => date('Y-m-d', strtotime($to . '-1 day')),
            'sort' => $arrange,
            'coSo' => $facility,
            'reportStatus' => $status,
        ]);
    }

    public function export()
    {
        return Excel::download(new ReportExport, 'danh_sach_bao_hong.xlsx');
    }

    public function ignoreSeriesReport(Request $request){
        $listReportId = $request->input('listReportId');
        // dd($listReportId);
        foreach ($listReportId as $reportId){
            $report = Report::find($reportId);
            // dd($report);
            if($report->status == ReportStatus::SENT->value){
                $report->status = ReportStatus::IGNORE->value;
                $report->save();
            }

        }
        return back()->with('message', 'Thao tác thành công!');
    }
}
