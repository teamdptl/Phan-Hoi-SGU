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
    public function index(){
        $currentDateTimeString = date('Y-m-d');
        $lastMonthDateTimeString = date('Y-m-d',strtotime($currentDateTimeString .'-1 month'));
        // dd($lastMonthDateTimeString);
        $reports = Report::with('room', 'equipments', 'media')->where('created_at', '>=', $lastMonthDateTimeString)->paginate(2);
        return Inertia::render('Admin/Report', [
            'reports' => $reports
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
