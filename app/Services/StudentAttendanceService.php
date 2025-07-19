<?php

namespace App\Services;

use App\Models\StudentAttendance;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class StudentAttendanceService
{
    public function listByJadwal($scheduleId)
    {
        return Cache::remember("studentAttendance.schedule.$scheduleId", 60, function() use($scheduleId){
            return StudentAttendance::with('student')
                ->where('schedule_id', $scheduleId)
                ->get();
        });
    }

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {
            return StudentAttendance::create($data);
        });
    }

    public function update(StudentAttendance $studentAttendance, array $data)
    {
        return DB::transaction(function () use ($studentAttendance, $data) {
            $studentAttendance->update($data);
            return $studentAttendance;
        });
    }

    public function delete(StudentAttendance $studentAttendance)
    {
        return $studentAttendance->delete();
    }
}
