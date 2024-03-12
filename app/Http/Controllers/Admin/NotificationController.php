<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $dateStart = Carbon::parse($request->input('dateStart', '-6 day'));
        $dateEnd =  Carbon::parse($request->input('dateEnd', 'tomorrow'));

        $notification = $request->user()->notifications()->where('created_at', '>=', $dateStart)
            ->where('created_at', '<', $dateEnd)->orderBy('created_at', 'desc')->paginate(50);

        $item = $notification->map(function ($item){
            return [
                'id' => $item->id,
                'link' => $item->data['link'],
                'title' => $item->data['title'] ?? "",
                'type' => $item->data['type'] ?? "info",
                'message' => $item->data['message'],
                'created_at' => $item->created_at
            ];
        });

        return Inertia::render('Admin/Notification', [
            'notification' => $item,
            'current' => $request->input('page', 1),
            'last_page' => $notification->lastPage(),
            'dateStart' => $dateStart->format('Y-m-d'),
            'dateEnd' => $dateEnd->format('Y-m-d')
        ]);
    }
}
