<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Teacher;
use App\Services\SubjectService;

class SubjectController extends Controller
{
    protected $service;

    public function __construct(SubjectService $service)
    {
        $this->service = $service;
    }

    public function index()
    {   
        // return $this->service->list();
        return inertia('Admin/Subjects/Index', ['subjects' => $this->service->list()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::with('user')->get();
        return inertia('Admin/Subjects/Create', ['teachers' => $teachers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('admin.subject.index')->with('success', 'Data subject added');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        $teachers = Teacher::with('user')->get();
        return inertia('Admin/Subjects/Edit', ['teachers' => $teachers, 'subject' => $subject]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $this->service->update($subject, $request->validated());
        return redirect()->route('admin.subject.index')->with('success', 'Data subject updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $this->service->delete($subject);
        return redirect()->route('admin.subject.index')->with('success', 'Data subject deleted');
    }
}
