<?php

namespace App\Services;

use App\Models\Kelas;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class KelasService
{
    public function list()
    {
        return Cache::remember('kelas.all', 60, function() {
            return Kelas::with(['students','subjects'])->get();
        });
    }

    public function store(array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($data){
            return Kelas::create($data);
        });
    }

    public function update(Kelas $kelas, array $data)
    {
        $this->forgetCache();
        return DB::transaction(function() use($kelas, $data){
            return $kelas->update($data);
        });
    }

    public function delete(Kelas $kelas)
    {
        $this->forgetCache();
        return DB::transaction(function() use($kelas){
            return $kelas->delete();
        });
    }

    private function forgetCache()
    {
        Cache::forget('kelas.all');
    }
}