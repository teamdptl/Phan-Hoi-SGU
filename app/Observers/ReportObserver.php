<?php

namespace App\Observers;

use App\Enums\ReportStatus;
use App\Enums\RoleEnum;
use App\Models\Report;
use App\Models\ReportLog;
use App\Models\Role;
use App\Notifications\ReportCreatedNotification;
use App\Notifications\ReportStatusChange;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class ReportObserver
{
    /**
     * Handle the Report "created" event.
     */
    public function created(Report $report): void
    {
        $report->logs()->create([
            'content' => 'Báo hỏng đã được tạo!',
            'status' => $report->status
        ]);

        $admins = Role::find(RoleEnum::ADMIN->value)->users;
        Notification::send($admins, new ReportCreatedNotification($report));
    }

    /**
     * Handle the Report "updated" event.
     */
    public function updated(Report $report): void
    {
        if ($report->status == ReportStatus::IGNORE->value){
            $report->logs()->create([
                'content' => 'Báo hỏng đã bị bỏ qua',
                'status' => $report->status
            ]);
            Notification::send(Auth::user(), new ReportStatusChange($report));
        }
        else if ($report->status == ReportStatus::PROCESS->value){
            if ($report->assignment && $report->assignment->worker){
                $report->logs()->create([
                    'content' => 'Báo hỏng đang thực hiện bởi '.$report->assignment->worker->name,
                    'status' => $report->status
                ]);
            }
            else {
                $report->logs()->create([
                    'content' => 'Báo hỏng đang thực hiện',
                    'status' => $report->status
                ]);
            }

            Notification::send(Auth::user(), new ReportStatusChange($report));
        }
        else if ($report->status == ReportStatus::COMPLETE->value){
            if ($report->reply && $report->reply->user){
                $report->logs()->create([
                    'content' => 'Báo hỏng đã hoàn thành bởi ' . $report->reply->user->name,
                    'status' => $report->status
                ]);
            }
            else {
                $report->logs()->create([
                    'content' => 'Báo hỏng đã hoàn thành',
                    'status' => $report->status
                ]);
            }
        }
    }

    /**
     * Handle the Report "deleted" event.
     */
    public function deleted(Report $report): void
    {
        $report->logs()->create([
            'content' => 'Báo hỏng đã bị xóa!',
            'status' => $report->status
        ]);
    }
}
