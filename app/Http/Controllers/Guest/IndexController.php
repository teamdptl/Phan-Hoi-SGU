<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\GuestViewRoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(GuestViewRoomRequest $request)
    {
        $room = Room::where('qr_code', $request->get('id'))->first();


        // $userEquimentIds = $room->equipments()->pluck('id', 'name')->toArray();



        return Inertia::render('Guest/RoomAction', [
            'roomName' => $room->name,
            'roomFacility' => $room->facility,
            'id' => $request->get('id'),
            'roomId' => $room->id,
            // 'userEquimentIds' => $userEquimentIds
        ]);
    }


}
