<?php

namespace App\Services;

use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentService
{
    public function list()
    {
        return Cache::remember('students.all', 60, function() {
            return Student::with(['user', 'kelas'])->get();
        });
    }

    public function store(array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($data){
            $user = User::create([
                'name' => $data['nama'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'])
            ]);

            return Student::create([
                'user_id' => $user->id,
                'nis' => $data['nis'],
                'kelas_id' => $data['kelas_id']
            ]);
        });
    }

    public function update(Student $student, array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($student, $data){
            $student->user->update([
                'name' => $data['nama'],
                'email' => $data['email'],
                'password' => isset($data['password']) && $data['password'] !== null ? Hash::make($data['password']) : $student->user->password
            ]);

            $student->update([
                'user_id' => $student->user->id,
                'nis' => $data['nis'],
                'kelas_id' => $data['kelas_id']
            ]);

            return $student;
        });
    }

    public function delete(Student $student)
    {
        $this->forgetCache();
        return DB::transaction(function() use($student){
            $student->user->delete();

            return $student->delete();
        });
    }

    public function forgetCache()
    {
        Cache::forget('students.all');
    }
}