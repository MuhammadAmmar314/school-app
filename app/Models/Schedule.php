<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'kelas_id',
        'subject_id',
        'teacher_id',
        'hari',
        'jp_mulai',
        'jumlah_jp',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function student_attendances()
    {
        return $this->hasMany(StudentAttendance::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
