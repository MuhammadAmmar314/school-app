<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Models\Kelas;
use App\Models\Subject;
use App\Models\Teacher;
use App\Services\ScheduleService;

class ScheduleController extends Controller
{
    protected $service;

    public function __construct(ScheduleService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return inertia('Admin/Schedules/Index', ['schedules' => $this->service->list()]);
    }

    public function create()
    {
        return inertia('Admin/Schedules/Create', [
            'kelas' => Kelas::all(),
            'subjects' => Subject::with('teacher.user')->get(),
            'teachers' => Teacher::with('user')->get()
        ]);
    }

    public function store(StoreScheduleRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->back()->with('success', 'Data Schedule added.');
    }
}
