<?php

namespace App\Http\Controllers\Guest;

use App\Enums\ReportStatus;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Room\GuestViewRoomRequest;
use App\Models\Report;
use App\Models\Role;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(GuestViewRoomRequest $request)
    {
        $room = Room::where('qr_code', $request->get('id'))->first();

        $user = $request->user();
        $reports = null;
        $reviews = null;
        $workers = null;
        if ($user){
            $reviews = $room->reviews();
            $workers = Role::find(RoleEnum::WORKER->value)->users;
            if ($user->isAdmin() || $user->isInspector()){
                $reports = $room->reports()->with(['room', 'media', 'assignment', 'reply', 'reply.media', 'equipments', 'logs'])->where('status', ReportStatus::SENT->value)
                    ->orWhere('status', ReportStatus::PROCESS->value)->paginate(10);
            }

            else if ($user->isWorker()){
                $reports = $user->reportWorker()->with(['room', 'media', 'assignment', 'reply', 'reply.media', 'equipments', 'logs'])->where('rooms_id', $room->id)
                    ->where('status', ReportStatus::PROCESS->value)->paginate(10);
            }
        }


        return Inertia::render('Guest/RoomAction', [
            'roomName' => $room->name,
            'roomFacility' => $room->facility,
            'id' => $request->get('id'),
            'roomId' => $room->id,
            'qrCode' => $room->qr_code,
            'reports' => $reports,
            'reviews' => $reviews,
            'workers' => $workers,
            // 'userEquimentIds' => $userEquimentIds
        ]);
    }


}
