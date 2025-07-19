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
        Schema::table('schedules', function(Blueprint $table){
            $table->dateTime('waktu_mulai')->after('teacher_id');
            $table->dateTime('waktu_selesai')->after('waktu_mulai');
            
            if (Schema::hasColumn('schedules', 'tanggal')) {
                $table->dropColumn('tanggal');
            }

            if (Schema::hasColumn('schedules', 'jam_mulai')) {
                $table->dropColumn('jam_mulai');
            }

            if (Schema::hasColumn('schedules', 'jam_selesai')) {
                $table->dropColumn('jam_selesai');
            }
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function(Blueprint $table){
            $table->dropColumn(['jam_mulai', 'jam_selesai']);
            $table->date('tanggal')->nullable();
            $table->time('jam_mulai')->nullable();
            $table->time('jam_selesai')->nullable();
        });
    }
};
