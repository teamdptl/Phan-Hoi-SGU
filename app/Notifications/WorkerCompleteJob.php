<?php

namespace App\Notifications;

use App\Models\Reply;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WorkerCompleteJob extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected Reply $reply;

    public function __construct(Reply $reply)
    {
        $this->reply = $reply;
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
        return [
            "link" => route('admin.report') .'/'.$this->reply->report->id,
            "title" => "Đã hoàn thành báo hỏng",
            "type" => "success",
            "message" => "Báo hỏng '".$this->reply->report->getTitle()."' ở phòng ".$this->reply->report->room->name."(".$this->reply->report->getFacility(). ") đã hoàn thành bởi ".$this->reply->user->name,
        ];
    }

    // set notification database type
    public function databaseType(object $notifiable): string
    {
        return 'admin-notification';
    }

}
