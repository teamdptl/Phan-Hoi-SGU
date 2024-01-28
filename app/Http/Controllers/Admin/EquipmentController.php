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
        return Inertia::render('Admin/CURD/EquipmentUpdate', [
            'types' => $types,
        ]);
    }

    public function storeNewEquipment(CreateEquipmentRequest $request){
        $file = $request->file('icon');
        $path = $request->file('icon')->storeAs(
            'icons', 'typeIcon_'.Str::uuid().'.'.$file->extension()
        );

        $data = $request->validationData();
        $data['icon'] = $path;

        $type = Type::find($data['type']);
        if ($type){
            $type->equipments()->create($data);
            return to_route('admin.equipment');
        }
    }
}
