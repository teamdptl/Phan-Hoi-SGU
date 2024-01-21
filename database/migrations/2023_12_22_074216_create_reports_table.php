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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('other')->nullable(); // Thiết bị khác
            $table->text('description')->nullable(); // Mô tả
            $table->json('location')->nullable(); // Vị trí báo cáo (Hiện tại không cần)
            $table->set('status', ['complete', 'sent', 'process', 'ignore']); // Trạng thái
            $table->foreignId('rooms_id')->constrained();
            $table->foreignId('users_id')->nullable()->default(null)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
