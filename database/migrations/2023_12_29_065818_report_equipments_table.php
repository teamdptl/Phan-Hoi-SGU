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
        Schema::create('report_equipments', function (Blueprint $table) {
            $table->foreignId('equipments_id')->constrained();
            $table->foreignId('reports_id')->constrained();
            $table->primary(['reports_id', 'equipments_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_equipments');
    }
};
