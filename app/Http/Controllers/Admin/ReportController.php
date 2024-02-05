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
        return Inertia::render('Admin/Report');
    }

    public function filterReports(Request $request){
        $request->validate([
            'from' =>'required',
            'to' =>'required',
        ]);

        $searchText = $request->input('searchText');
        $from = $request->input('from');
        $to = $request->input('to');
        $facility = $request->input('facility');
        $arrange = $request->input('arrange');

        $reports = Report::where(function($query) use ($searchText){
                            $query->whereHas('equipments', function ($query) use ($searchText){
                                $query->where('name', 'like','%'. $searchText .'%');
                            })
                            ->orWhere('description', 'like','%'. $searchText .'%')
                            ->orWhere('other', 'like','%'. $searchText .'%')
                            ->orWhereHas('room', function ($query) use ($searchText){
                                $query->where('name', 'like','%'. $searchText.'%');
                            });
                        })
                        ->where('created_at', '>=', $from)
                        ->where('created_at', '<=', $to);
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
                       
        $reports = $reports->get();
        dd($reports);
    }
}
