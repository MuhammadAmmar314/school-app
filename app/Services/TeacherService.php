<?php

namespace App\Services;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherService
{
    public function list()
    {
        return Cache::remember('teachers.all', 60, function() {
            return Teacher::with('user')->get();
        });
    }

    public function store(array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($data){
            $teacher_user = User::create([
                'name' => $data['nama'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'teacher'
            ]);

            return Teacher::create([
                'user_id' => $teacher_user->id,
                'nip' => $data['nip']
            ]);
        });
    }

    public function update(Teacher $teacher, array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($teacher, $data){
            $teacher->user->update([
                'name' => $data['nama'],
                'email' => $data['email'],
                'password' => isset($data['password']) && $data['password'] !== null ? Hash::make($data['password']) : $teacher->user->password
            ]);

            $teacher->update([
                'nip' => $data['nip']
            ]);

            return $teacher;
        });
    }

    public function delete(Teacher $teacher)
    {
        $this->forgetCache();
        return DB::transaction(function() use($teacher){
            $teacher->user->delete();

            return $teacher->delete();
        });
    }

    public function getAvailableTeachersForSubject($subjectId)
    {
        $usedTeacherIds = DB::table('subject_teacher')
            ->where('subject_id', $subjectId)
            ->pluck('teacher_id');

        return Teacher::whereNotIn('id', $usedTeacherIds)
            ->with('user')
            ->get();
    }

    private function forgetCache()
    {
        Cache::forget('teachers.all');
    }
}
