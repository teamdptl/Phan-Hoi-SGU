<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request){
        $currentDateTimeString = date('Y-m-d');
        $lastMonthDateTimeString = date('Y-m-d',strtotime($currentDateTimeString .'-1 month'));
        $searchText = $request->input('searchText') ?? ' ';
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
            'to' => $to,
            'sort' => $arrange,
            'coSo' => $facility,
            'reportStatus' => $status,
        ]);
    }

    public function filterReports(Request $request){

        $searchText = $request->input('searchText');
        $from = $request->input('from') ?? '1970-01-01';
        $to = $request->input('to') ?? '';
        $facility = $request->input('facility');
        $arrange = $request->input('arrange');

        $reports = Report::with('room', 'equipments', 'media')->where(function($query) use ($searchText){
                            $query->whereHas('equipments', function ($query) use ($searchText){
                                $query->where('name', 'like','%'. $searchText .'%');
                            })
                            ->orWhere('description', 'like','%'. $searchText .'%')
                            ->orWhere('other', 'like','%'. $searchText .'%')
                            ->orWhereHas('room', function ($query) use ($searchText){
                                $query->where('name', 'like','%'. $searchText.'%');
                            });
                        })
                        ->where('created_at', '>=', $from);
        if($to != ''){
            $reports = $reports->where('created_at', '<=', $to);
        }

        if($facility != 'all'){
            $reports = $reports->whereHas('room', function ($query) use($facility){
                $query->where('facility', $facility);
            });
        }
        
        
        if($arrange == 'increase'){
            $reports = $reports->orderBy('created_at', 'asc');
        }else{
            $reports = $reports->orderBy('created_at', 'desc');
        }
                       
        $reports = $reports->paginate(2);

        // dd($reports);
        return Inertia::render('Admin/Report', [
          'reports' => $reports,
        ]);
    }
}
