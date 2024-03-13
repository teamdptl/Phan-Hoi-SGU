<?php

namespace App\Notifications;

use App\Enums\ReportStatus;
use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportStatusChange extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected Report $report;

    public function __construct(Report $report)
    {
        $this->report = $report;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $message = "";
        $title = "";
        $type = "";
        if ($this->report->status == ReportStatus::IGNORE->value){
            $message = "Bạn đã bỏ qua báo hỏng '".$this->report->getTitle()."' ở phòng ".$this->report->room->name.
                "(". $this->report->getFacility() .")";
            $title = "Bỏ qua báo hỏng";
            $type = "danger";
        }
        else if ($this->report->status == ReportStatus::PROCESS->value){
            $message = "Bạn đã giao báo hỏng '".$this->report->getTitle()."' ở phòng ".$this->report->room->name.
                " (".$this->report->getFacility().") cho nhân viên ".$this->report->assignment->worker->name;
            $title = "Giao báo hỏng";
            $type = "warning";
        }
        return [
            "link" => route('admin.report') .'/'.$this->report->id,
            "title" => $title,
            "type" => $type,
            'message' => $message
        ];
    }

    public function databaseType(object $notifiable): string
    {
        return 'admin-notification';
    }
}
