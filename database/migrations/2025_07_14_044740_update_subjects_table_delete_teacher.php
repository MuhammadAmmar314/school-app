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
        Schema::table('subjects', function(Blueprint $table) {
            if (Schema::hasColumn('subjects', 'teacher_id')) {
                $table->dropForeign(['teacher_id']);
                $table->dropColumn('teacher_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function(Blueprint $table){
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
        });
    }
};
