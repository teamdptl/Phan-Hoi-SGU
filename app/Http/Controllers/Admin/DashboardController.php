<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReportStatus;
use App\Http\Controllers\Controller;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request){
        $dateStart = Carbon::parse($request->input('dateStart', '-6 day'));
        $dateEnd = Carbon::parse($request->input('dateEnd', 'tomorrow'));
        $facility = $request->input('coSo', '');
        $rooms = Room::with(['reports' => function ($query) use ($dateStart, $dateEnd) {
            $query->where('created_at', '>=', $dateStart)
                ->where('created_at', '<=', $dateEnd);
        }])->where('facility', 'LIKE', '%'.$facility.'%')->get();

        $rooms->each(function ($room) use ($dateStart, $dateEnd) {
            $room->reports_count = $room->reports->count();
            $room->reports_done = $room->reports->filter(function ($item){
                return $item->status == ReportStatus::COMPLETE->value;
            })->count();

            $room->reports_ignore = $room->reports->filter(function ($item){
                return $item->status == ReportStatus::IGNORE->value;
            })->count();
        });

        $rooms = $rooms->sortByDesc('reports_count')->take(20);

        $total = $rooms->sum('reports_count');
        $done = $rooms->sum('reports_done');
        $ignore = $rooms->sum('reports_ignore');

        // get notification in date range
        $notification = $request->user()->notifications()
            ->where('created_at', '>=', $dateStart)
            ->where('created_at', '<', $dateEnd)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        $notification = $notification->map(function ($item){
            return [
                'id' => $item->id,
                'link' => $item->data['link'],
                'title' => $item->data['title'] ?? "",
                'type' => $item->data['type'] ?? "info",
                'message' => $item->data['message'],
                'created_at' => $item->created_at
            ];
        });

        return Inertia::render('Admin/Dashboard',[
            'rooms' => $rooms,
            'total' => $total,
            'done' => $done,
            'ignore' => $ignore,
            'notDone' => $total - $done,
            'thongBao' => $notification,
            'facility' => $facility,
            'dateStart' => $dateStart->format('Y-m-d'),
            'dateEnd' => $dateEnd->format('Y-m-d')
        ]);
    }
}
