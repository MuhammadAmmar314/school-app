<?php

namespace App\Services;

use App\Models\Score;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ScoreService
{
    public function listByStudent($studentId)
    {
        return Cache::remember("score.student.$studentId", 60, function() use($studentId){
            return Score::with('subject')
                ->where('student_id', $studentId)
                ->get();
        });
    }

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {
            return Score::create($data);
        });
    }

    public function update(Score $score, array $data)
    {
        return DB::transaction(function () use ($score, $data) {
            $score->update($data);
            return $score;
        });
    }

    public function delete(Score $score)
    {
        return $score->delete();
    }
}
