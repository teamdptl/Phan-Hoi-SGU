<?php

namespace App\Http\Controllers\Admin;

use App\Exports\EquipmentExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Equipment\CreateEquipmentRequest;
use App\Imports\EquipmentImport;
use App\Models\Equipment;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use function Laravel\Prompts\search;

class EquipmentController extends Controller
{
    public function index(Request $request){
        $paginator = Equipment::with('type')->where('name', 'like', '%'.$request->input('search', '').'%')
            ->orWhere('description', 'like', '%'.$request->input('search', '').'%')->paginate(20);
        $items = $paginator->items();
        $currentPage = $paginator->currentPage();
//        if ($currentPage != 1 && count($items) == 0){
//            return redirect()->route('admin.equipment');
//        }
        return Inertia::render('Admin/Equipment',[
            'equipments' => $items,
            'total' => $paginator->total(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
            'lastPage' => $paginator->lastPage(),
            'currentPage' => $currentPage,
            'search' => $request->input('search', '')
        ]);
    }

    public function addEquipment(){
        $types = Type::all();
        return Inertia::render('Admin/CURD/EquipmentSave', [
            'types' => $types,
        ]);
    }

    public function updateEquipment(string $id){
        $types = Type::all();
        $equipment = Equipment::find($id);
        return Inertia::render('Admin/CURD/EquipmentUpdate', [
            'types' => $types,
            'equipment' => $equipment
        ]);
    }

    public function infoEquipment(string $id){
        $equipment = Equipment::find($id);
        if ($equipment){
            $types = Type::all();
            return Inertia::render('Admin/CURD/EquipmentInfo', [
                'types' => $types,
                'equipment' => $equipment,
                'roomHave' => $equipment->rooms->map(function ($item){
                    return $item->only(["name"]);
                }),
            ]);
        }
        return redirect('admin.equipment');
    }

    public function storeNewEquipment(CreateEquipmentRequest $request){
        $file = $request->file('icon');
        $path = '/logo.png';
        if ($file != null){
            $path = $request->file('icon')->storeAs(
                'equipment', 'equipmentIcon_'.Str::uuid().'.'.$file->extension()
            );
            $path = '/storage/'.$path;
        }
        $data = $request->validationData();
        $data['icon'] = $path;

        $type = Type::find($data['type']);
        if ($type){
            $type->equipments()->create($data);
            return to_route('admin.equipment');
        }
    }

    public function updateEquipmentData(CreateEquipmentRequest $request, string $id){
        $equipment = Equipment::find($id);

        // Lưu hình ảnh mới
        $file = $request->file('icon');
        $path = $equipment->icon;
        if ($file != null){
            $path = $request->file('icon')->storeAs(
                'equipment', 'equipmentIcon_'.Str::uuid().'.'.$file->extension()
            );
            $path = '/storage/'.$path;
        }

        // Cập nhật thông tin
        $equipment->icon = $path;
        $equipment->name = $request->get('name');
        $equipment->description = $request->get('description');
        $equipment->type()->dissociate(); // Gỡ khóa ngoại

        $type = Type::find($request->get('type'));
        if ($type){
            $type->equipments()->save($equipment);
            return to_route('admin.equipment');
        }
    }

    public function removeEquipment(string $id){
        $equip = Equipment::find($id);
        if ($equip){
            DB::beginTransaction();
            try {
                $equip->delete();
                DB::commit();
                return back()->with('message', 'Xóa thành công');
            } catch (\Exception $e){
                DB::rollBack();
                return back()->with('error', 'Xóa thất bại');
            }
        }
        return back()->with('error', 'Không tồn tại thiết bị này');
    }

    public function removeListEquipment(Request $request){
        $itemIds = $request->input('items', []);
        DB::beginTransaction();
        try{
            Equipment::whereIn('id', $itemIds)->delete();
            DB::commit();
            return back()->with('message', 'Xóa thành công');
        }
        catch (\Exception $e){
            DB::rollBack();
            return back()->with('error', 'Xóa thất bại');
        }
    }

    public function export(){
        return Excel::download(new EquipmentExport, 'danh_sach_thiet_bi.xlsx');
    }

    public function import(Request $request){
        Excel::import(new EquipmentImport, $request->file('file'), null, \Maatwebsite\Excel\Excel::XLSX);
    }
}
