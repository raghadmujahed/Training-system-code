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
       Schema::create('training_assignments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('training_request_id')->constrained()->cascadeOnDelete();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('training_site_id')->constrained()->cascadeOnDelete();
    $table->foreignId('coordinator_id')->constrained('users')->cascadeOnDelete();
    $table->foreignId('supervisor_id')->nullable()->constrained('users')->nullOnDelete();
    $table->foreignId('training_period_id')->constrained()->cascadeOnDelete();
    $table->enum('status', ['assigned', 'ongoing', 'completed'])->default('assigned');
    $table->date('start_date')->nullable();
    $table->date('end_date')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_assignments');
    }
};
