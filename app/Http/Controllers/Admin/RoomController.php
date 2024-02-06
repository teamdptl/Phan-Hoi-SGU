<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EquipmentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Room\CreateRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Models\Equipment;
use App\Models\Report;
use App\Models\Review;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request){
        $sortColumn = $request->filled('sortColumn') ? $request->get('sortColumn') : 'created_at';
        $sortType = $request->filled('sortType') ? $request->get('sortType') : 'asc';
        $paginator = Room::with(['reports', 'reviews'])
            ->when($request->filled('search'), function($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('search') . '%');
            })
            ->when($request->filled('coSo'), function($query) use ($request) {
                $query->where('facility', $request->input('coSo', ''));
            })
            ->addSelect(['average_rating' => Review::selectRaw('avg(rating)')->whereColumn('rooms_id', 'rooms.id')])
            ->addSelect(['total_ratings' => Review::selectRaw('count(*)')->whereColumn('rooms_id', 'rooms.id')])
            ->addSelect(['sent_reports' => Report::selectRaw('count(*)')->whereColumn('rooms_id', 'rooms.id')->where('status', 'sent')])
            ->orderBy(
                $sortColumn,
                $sortType
            )->paginate(20);
        return Inertia::render('Admin/Room', [
            'search' => $request->input('search', ''),
            'rooms' => $paginator->items(),
            'total' => $paginator->total(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
            'lastPage' => $paginator->lastPage(),
            'currentPage' => $paginator->currentPage(),
            'coSo' => $request->input('coSo', ''),
            'sortColumn' => $sortColumn,
            'sortType' => $sortType,
        ]);
    }

    public function addRoomForm(){
        $equipments = Equipment::all();
        // Tạo mã qrCode không trùng
        // Cấu trúc mã qr: url + /?id= + đoạn mã random của $qr_code
        $qr_code = $this->generateRandomString();
        return Inertia::render('Admin/CURD/RoomSave', [
            'equipments' => $equipments,
            'url' => route('room.select', ['id' => $qr_code]),
            'qr_code' => $qr_code,
        ]);
    }

    public function addRoomRequest(CreateRoomRequest $request){
        $room = new Room($request->validationData());
        $room->save();
        $equipmentData = [];
        foreach ($request->input('equipments', []) as $id) {
            $equipmentData[$id] = ['status' => EquipmentStatus::USING->value];
        }

        $room->equipments()->attach($equipmentData);
        return to_route('admin.room');
    }

    public function infoRoomForm(string $id){
        $room = Room::with(['equipments', 'reports', 'reviews'])->find($id);
        $equipments = Equipment::all();
        return Inertia::render('Admin/CURD/RoomDetail', [
            'room' => $room,
            'equipments' => $equipments,
            'url' => route('room.select', ['id' => $room->qr_code]),
        ]);
    }

    public function editRoomForm(string $id){
        $room = Room::with('equipments')->find($id);
        $equipments = Equipment::all();
        $newQrCode = $this->generateRandomString();
        return Inertia::render('Admin/CURD/RoomUpdate', [
            'equipments' => $equipments,
            'url' => route('room.select', ['id' => $room->qr_code]),
            'qr_code' => $room->qr_code,
            'new_qr_code' => $newQrCode,
            'new_url' => route('room.select', ['id' => $newQrCode]),
            'room' => $room
        ]);
    }

    public function editRoomRequest(UpdateRoomRequest $request, string $id){
        $room = Room::find($id);
        if ($room){
            $room->name = $request->get('name');
            $room->type = $request->get('type');
            $room->facility = $request->get('facility');
            $room->qr_code = $request->get('qr_code');
            $room->save();
            $room->equipments()->syncWithPivotValues($request->input('equipments', []), ['status' => EquipmentStatus::USING->value]);
        }
        return to_route('admin.room');
    }

    public function removeRoom(string $id){
        $room = Room::find($id);
        if ($room){
            DB::beginTransaction();
            try {
                $room->equipments()->detach();
                $room->delete();
                DB::commit();
            } catch (\Exception $e){
                DB::rollBack();
                return back()->with('error', 'Không thể xóa phòng do có tồn tại báo hỏng hoặc đánh giá');
            }
            return back()->with('message', 'Xóa thành công');
        }
        return back()->with('error', 'Không tìm thấy phòng');
    }

    public function removeListRoom(Request $request){
        // TODO: Chức năng chưa hoàn thiện, cần sửa lại
        $itemIds = $request->input('items');
        $rooms = Room::whereIn('id', $itemIds)->get();
        DB::beginTransaction();
        foreach ($rooms as $room){
            try{
                $room->equipments()->detach();
                $room->delete();
            } catch (\Exception $e){
                DB::rollBack();
                return back()->with('error', 'Không thể xóa phòng do có tồn tại báo hỏng hoặc đánh giá');
            }
        }
        DB::commit();
        return back()->with('message', 'Xóa thành công các phòng');
    }


    // Hàm dùng để tạo chuỗi ngẫu nhiên cho qrcode phòng
    function generateRandomString($length = 8): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
