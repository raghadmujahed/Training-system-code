<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('backups', function (Blueprint $table) {
            $table->id();

            // من أنشأ النسخة (اختياري)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // نوع النسخة: database / files / full
            $table->string('type');

            // اسم النسخة
            $table->string('name');

            // مسار الملف أو مكان التخزين
            $table->string('file_path');

            // حجم الملف (KB / MB)
            $table->bigInteger('size')->nullable();

            // الحالة: success / failed / in_progress
            $table->string('status')->default('success');

            // ملاحظات
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('backups');
    }
};