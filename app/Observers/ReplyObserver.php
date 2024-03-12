<?php

namespace App\Observers;

use App\Enums\RoleEnum;
use App\Models\Reply;
use App\Models\Role;
use App\Notifications\WorkerCompleteJob;
use Illuminate\Support\Facades\Notification;

class ReplyObserver
{
    /**
     * Handle the Reply "created" event.
     */
    public function created(Reply $reply): void
    {
        $admins = Role::find(RoleEnum::ADMIN->value)->users;
        Notification::send($admins, new WorkerCompleteJob($reply));
    }
}
