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
        Schema::create('reply_media', function (Blueprint $table) {
            $table->foreignId('reply_id')->references('id')->on('reply');
            $table->foreignId('media_id')->constrained();
            $table->primary(['reply_id', 'media_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reply_media');
    }
};
