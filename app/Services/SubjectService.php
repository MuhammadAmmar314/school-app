<?php

namespace App\Services;

use App\Models\Subject;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SubjectService
{
    public function list()
    {
        return Cache::remember('subjects.all', 60, function() {
            return Subject::with(['teachers.user'])->get();
        });
    }

    public function store(array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($data){
            return Subject::create($data);
        });
    }

    public function update(Subject $subject, array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($subject, $data){
            return $subject->update($data);
        });
    }

    public function delete(Subject $subject)
    {
        $this->forgetCache();
        return DB::transaction(function() use($subject){
            return $subject->delete();
        });
    }

    private function forgetCache()
    {
        Cache::forget('subjects.all');
    }
}