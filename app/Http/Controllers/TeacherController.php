<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Models\Teacher;
use App\Services\TeacherService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    protected $service;

    public function __construct(TeacherService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return inertia('Admin/Teacher/Index', ['teachers' => $this->service->list()]);
    }

    public function create()
    {
        return inertia('Admin/Teacher/Create');
    }

    public function store(StoreTeacherRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('admin.teacher.index')->with('success', 'Data teacher added');
    }

    public function edit(Teacher $teacher)
    {
        $teacher->load('user');

        return Inertia::render('Admin/Teacher/Edit', [
            'teacher' => $teacher
        ]);
    }

    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $this->service->update($teacher, $request->validated());
        return redirect()->route('admin.teacher.index')->with('success', 'Data teacher updated');
    }

    public function destroy(Teacher $teacher)
    {
        $this->service->delete($teacher);
        return redirect()->route('admin.teacher.index')->with('success', 'Data teacher deleted');
    }

    public function available(Request $request)
    {
        $subjectId = $request->query('subject_id');
        $teachers = $this->service->getAvailableTeachersForSubject($subjectId);

        return response()->json($teachers);
    }
}
