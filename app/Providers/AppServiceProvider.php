<?php

namespace App\Providers;

use App\Models\Reply;
use App\Models\Report;
use App\Observers\ReplyObserver;
use App\Observers\ReportObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Report::observe(ReportObserver::class);
        Reply::observe(ReplyObserver::class);
    }
}
