<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Equipment\CreateEquipmentRequest;
use App\Models\Equipment;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index(Request $request){
        $paginator = Equipment::where('name', 'like', '%'.$request->input('search', '').'%')
            ->orWhere('description', 'like', '%'.$request->input('search', '').'%')->paginate(20);
        return Inertia::render('Admin/Equipment',[
            'equipments' => $paginator->items(),
            'total' => $paginator->total(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
            'lastPage' => $paginator->lastPage(),
            'currentPage' => $paginator->currentPage(),
            'search' => $request->input('search', '')
        ]);
    }

    public function addEquipment(){
        $types = Type::all();
        return Inertia::render('Admin/CURD/EquipmentSave', [
            'types' => $types,
        ]);
    }

    public function updateEquipment(){
        $types = Type::all();
        return Inertia::render('Admin/CURD/EquipmentUpdate', [
            'types' => $types,
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
}
