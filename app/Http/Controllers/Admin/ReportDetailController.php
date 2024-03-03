<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ReportStatus;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Report;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportDetailController extends Controller
{
    public function index(string $id){
        $report = Report::with('room', 'equipments', 'media', 'assignment', 'reply', 'reply.media')->find($id);
        $worker = Role::find(RoleEnum::WORKER->value)->users;
        return Inertia::render('Admin/CURD/ReportDetail', [
            'report' => $report,
            'worker' => $worker
        ]);
    }

    public function assignReport(string $id, Request $request){
        $report = Report::find($id);
        if ($report->status == ReportStatus::SENT->value){
            $report->assignment()->create([
                'worker_id' => $request->get('workerId'),
                'manager_id' => $request->get('adminId')
            ]);
            $report->status = ReportStatus::PROCESS->value;
            $report->save();
            return back()->with('message', 'Phân công nhân viên thành công');
        }
        return back()->with('message', 'Phân công nhân nhân viên thất bại');
    }

    public function ignoreReport(string $id){
        $report = Report::find($id);
        if ($report->status == ReportStatus::SENT->value){
            $report->status = ReportStatus::IGNORE->value;
            $report->save();
            return back()->with('message', 'Bỏ qua báo hỏng thành công');
        }
        return back()->with('message', 'Bỏ qua báo hỏng thất bại');
    }

    public function undoAssign(string $id){
        $report = Report::find($id);
        if ($report->status == ReportStatus::PROCESS->value){
            $report->assignment()->delete();
            $report->status = ReportStatus::SENT->value;
            $report->save();
        }
    }
}
