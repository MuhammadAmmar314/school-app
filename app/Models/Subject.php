<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
    ];

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'subject_teacher');
    }

    public function kelas()
    {
        return $this->belongsToMany(Kelas::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}
