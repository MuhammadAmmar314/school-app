<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\Kelas;
use App\Services\KelasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    protected $service;

    public function __construct(KelasService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return inertia('Admin/Kelas/Index', ['kelas' => $this->service->list()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Kelas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKelasRequest $request)
    {
        $this->service->store($request->validated());
        return redirect()->route('admin.kelas.index')->with('success', 'Data Kelas berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelas $kelas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelas $kela)
    {
        return Inertia::render('Admin/Kelas/Edit', [
            'kelas' => $kela
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKelasRequest $request, Kelas $kela)
    {
        $this->service->update($kela, $request->validated());
        return redirect()->route('admin.kelas.index')->with('success', 'Data kelas berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kela)
    {
        $this->service->delete($kela);
        return redirect()->route('admin.kelas.index')->with('success', 'Data kelas berhasil dihapus');
    }
}
