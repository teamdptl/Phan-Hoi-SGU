<?php

namespace App\Http\Controllers\Worker;

use App\Enums\ReportStatus;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(Request $request){
        $workers = Role::find(RoleEnum::WORKER->value)->users;
        $processReport = $request->user()->reportWorker()->with(['room', 'media', 'assignment', 'reply', 'reply.media', 'equipments', 'logs'])
            ->where('status', ReportStatus::PROCESS->value)
            ->orderBy('assignment.created_at', 'desc')
            ->paginate(10, ['*'], 'page_process');
        $successReport = $request->user()->reportWorker()->with(['room', 'media', 'assignment', 'reply', 'reply.media', 'equipments', 'logs'])
            ->where('status', ReportStatus::COMPLETE->value)
            ->orderBy('assignment.created_at', 'desc')
            ->paginate(10, ['*'], 'page_success');
        return Inertia::render('Worker/WorkerReportList', [
            'workers' => $workers,
            'processReport' => $processReport,
            'successReport' => $successReport
        ]);
    }
}
