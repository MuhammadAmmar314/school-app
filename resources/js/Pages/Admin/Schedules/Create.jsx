import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, kelas, subjects, teachers })
{
    const [selectedSubject, setSelectedSubject] = useState(null);
    const {data, setData, post, processing, errors} = useForm({
        kelas_id: '',
        subject_id: '',
        teacher_id: ''
    });
    console.log(selectedSubject)
    const submit = (e) => {
        e.preventDefault();
        post.route('admin.schedule.store');
    }
    return (
        <AuthenticatedLayout user={auth.user} header='Tambah Jadwal'>
            <Head title="Tambah Jadwal" />

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Kelas</label>
                    <select value={data.kelas_id} className={`form-control ${errors.kelas ? 'is-invalid' : ''}`} onChange={e => setData('kelas_id', e.target.value)} autoFocus>
                        <option value="">-- Pilih Kelas --</option>
                        {kelas.map((k) => (
                            <option key={k.id} value={k.id}>{k.nama}</option>
                        ))}
                    </select>
                    {errors.kelas_id && <div className="invalid-feedback">{errors.kelas_id}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mata Pelajaran</label>
                    <select
                        value={data.subject_id}
                        className={`form-control ${errors.subject_id ? 'is-invalid' : ''}`}
                        onChange={e => {
                            const id = e.target.value;
                            setData('subject_id', id);
                            const subject = subjects.find(s => s.id == id);
                            setSelectedSubject(subject);
                            setData('teacher_id', '');
                        }}
                    >
                        <option value=''>-- Pilih Mata Pelajaran --</option>
                        {subjects.map((s) => (
                            <option key={s.id} value={s.id}>{s.nama}</option>
                        ))}
                    </select>
                    {errors.subject_id && <div className="invalid-feedback">{errors.subject_id}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Pengajar</label>
                    <select
                        value={data.teacher_id}
                        className={`form-control ${errors.teacher_id ? 'is-invalid' : ''}`}
                        onChange={e => setData('teacher_id', e.target.value)}
                        disabled={!selectedSubject || !selectedSubject.teacher}
                    >
                        <option value="">
                            {selectedSubject
                            ? selectedSubject.teacher
                                ? '-- Pilih Guru --'
                                : 'Tidak ada guru pada mata pelajaran ini'
                            : '-- Pilih Mata Pelajaran terlebih dahulu --'}
                        </option>

                        {selectedSubject?.teacher && (
                            <option value={selectedSubject.teacher.id}>{selectedSubject.teacher.user.name}</option>
                        )}
                    </select>
                    {errors.teacher_id && <div className="invalid-feedback">{errors.teacher_id}</div>}
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
