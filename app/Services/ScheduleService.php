<?php

namespace App\Services;

use App\Models\Schedule;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ScheduleService
{
    public function list()
    {
        return Cache::remember('schedules.all', 60, function() {
            return Schedule::with(['kelas','subject','student_attendances'])->get();
        });
    }

    public function store(array $data)
    {
        return DB::transaction(function() use($data){
            return Schedule::create($data);
        });
    }
}