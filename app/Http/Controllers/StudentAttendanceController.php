<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentAttendanceRequest;
use App\Models\StudentAttendance;
use App\Services\StudentAttendanceService;
use Illuminate\Http\Request;

class StudentAttendanceController extends Controller
{
    protected $service;

    public function __construct(StudentAttendanceService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $scheduleId = $request->get('schedule_id');
        $studentAttendance = $this->service->listByJadwal($scheduleId);

        return inertia('Admin/Absensi/Index', compact('studentAttendance'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentAttendanceRequest $request)
    {
        $this->service->store($request->validated());
        return back()->with('success', 'Absensi ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentAttendance $studentAttendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentAttendance $studentAttendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentAttendance $studentAttendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentAttendance $studentAttendance)
    {
        //
    }
}
