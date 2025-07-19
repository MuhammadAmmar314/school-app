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
            $table->enum('hari', ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'])->after('teacher_id');
            $table->unsignedTinyInteger('jp_mulai')->after('hari');
            $table->unsignedTinyInteger('jumlah_jp')->after('jp_mulai');

            if (Schema::hasColumn('schedules', 'waktu_mulai')) {
                $table->dropColumn('waktu_mulai');
            }
            if (Schema::hasColumn('schedules', 'waktu_selesai')) {
                $table->dropColumn('waktu_selesai');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn(['hari', 'jp_mulai', 'jumlah_jp']);
        });
    }
};
