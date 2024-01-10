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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("type"); // Mục đích sử dụng (dạy học,...)
            $table->enum("facility", ["c", "1", "2"]); // Cơ sở
            $table->uuid("qr_code"); // Tạo mã qr bằng cái này để tránh lộ mã phòng
            $table->string("icon")->nullable();
            $table->json("extra_data")->nullable(); // Extra data sẽ chứa range của location
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
