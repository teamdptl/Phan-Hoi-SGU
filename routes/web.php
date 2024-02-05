<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test', [\App\Http\Controllers\TestController::class, 'index']);
Route::get('/gui-bao-hong', [\App\Http\Controllers\Guest\SendReportController::class, 'index']);
Route::post('/gui-bao-hong', [\App\Http\Controllers\Guest\SendReportController::class, 'store']);


// Admin
Route::get('/admin/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index']);
Route::get('/admin/room', [\App\Http\Controllers\Admin\RoomController::class, 'index']);
Route::get('/admin/room/add', [\App\Http\Controllers\Admin\RoomController::class, 'addRoom']);
Route::get('/admin/room/info', [\App\Http\Controllers\Admin\RoomController::class, 'roomInfo']);
Route::get('/admin/equipment', [\App\Http\Controllers\Admin\EquipmentController::class, 'index'])->name('admin.equipment');
Route::get('/admin/equipment/add', [\App\Http\Controllers\Admin\EquipmentController::class, 'addEquipment']);
Route::get('/admin/equipment/{id}', [\App\Http\Controllers\Admin\EquipmentController::class, 'infoEquipment']);
Route::get('/admin/equipment/update/{id}', [\App\Http\Controllers\Admin\EquipmentController::class, 'updateEquipment']);
Route::post('/admin/equipment/add', [\App\Http\Controllers\Admin\EquipmentController::class, 'storeNewEquipment']);
Route::post('/admin/equipment/update/{id}', [\App\Http\Controllers\Admin\EquipmentController::class, 'updateEquipmentData']);
Route::delete('/admin/equipment/{id}', [\App\Http\Controllers\Admin\EquipmentController::class, 'removeEquipment']);
Route::delete('/admin/equipment/list', [\App\Http\Controllers\Admin\EquipmentController::class, 'removeListEquipment']);
Route::get('/admin/user', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.user');
Route::get('/admin/user/add', [\App\Http\Controllers\Admin\UserController::class, 'addUser']);
Route::post('/admin/user/add', [\App\Http\Controllers\Admin\UserController::class, 'storeNewUser']);
Route::get('/admin/report', [\App\Http\Controllers\Admin\ReportController::class, 'index']);
Route::post('/admin/report/filters', [\App\Http\Controllers\Admin\ReportController::class, 'filterReports']);
Route::get('/admin/review', [\App\Http\Controllers\Admin\ReviewController::class, 'index']);

// Guests
Route::get('/guest/rating', [\App\Http\Controllers\Guest\RatingController::class, 'index']);
Route::post('/guest/rating', [\App\Http\Controllers\Guest\RatingController::class, 'checkWithCaptcha']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin middleware
    Route::middleware('admin')->group(function () {

    });

    // Worker middleware
    Route::middleware('worker')->group(function () {

    });

    Route::middleware('inspector')->group(function () {

    });
});

require __DIR__ . '/auth.php';
