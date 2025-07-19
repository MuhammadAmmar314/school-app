<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Kelas;
use App\Models\Student;
use App\Services\StudentService;

class StudentController extends Controller
{
    protected $service;

    public function __construct(StudentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return inertia('Admin/Student/Index', ['students' => $this->service->list()]);
    }

    public function create()
    {
        $kelas = Kelas::all();
        return inertia('Admin/Student/Create', ['kelas' => $kelas]);
    }

    public function store(StoreStudentRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('admin.student.index')->with('success', 'Data Student added.');
    }

    public function edit(Student $student)
    {
        $student->load('user');
        $kelas = Kelas::all();

        return inertia('Admin/Student/Edit', ['student' => $student, 'kelas' => $kelas]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $this->service->update($student, $request->validated());
        return redirect()->route('admin.student.index')->with('success', 'Data murid berhasil diupdate.');
    }

    public function destroy(Student $student)
    {
        $this->service->delete($student);
        return redirect()->route('admin.student.index')->with('success', 'Data murid berhasil dihapus.');
    }
}
