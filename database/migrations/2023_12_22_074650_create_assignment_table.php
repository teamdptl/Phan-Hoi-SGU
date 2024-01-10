<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assignment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('worker_id')->references('id')->on('users'); // Nhân viên thực hiện
            $table->foreignId('manager_id')->references('id')->on('users'); // Admin giao việc
            $table->foreignId('reports_id')->constrained();
            $table->text('note')->nullable(); // Nội dung ghi chú
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignment');
    }
};
