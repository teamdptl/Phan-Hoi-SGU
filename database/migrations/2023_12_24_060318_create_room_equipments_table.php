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
        Schema::create('room_equipments', function (Blueprint $table) {
            $table->foreignId('rooms_id')->constrained();
            $table->foreignId('equipments_id')->constrained();
            $table->set('status', ['Đang sử dụng', 'Hư hỏng']);
            $table->primary(['rooms_id', 'equipments_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_equipments');
    }
};
