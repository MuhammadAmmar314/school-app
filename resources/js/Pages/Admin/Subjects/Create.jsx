import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, teachers }){
    const {data, setData, post, processing, errors} = useForm({
        nama: '',
        teacher_id: ''
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.subject.store'));
    }
    return (
        <AuthenticatedLayout user={auth.user} header='Tambah Mata Pelajaran'>
            <Head title='Tambah Mata Pelajaran'/>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Nama Mata Pelajaran</label>
                    <input type="text" className={`form-control ${errors.nama ? 'is-invalid' : ''}`} value={data.nama} onChange={(e) => setData('nama', e.target.value)} autoFocus/>
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Pengajar</label>
                    <select className="form-control" value={data.teacher_id} onChange={e => setData('teacher_id', e.target.value)}>
                        <option value="">-- Pilih Pengajar --</option>
                        {teachers.map((t) => (
                            <option key={t.id} value={t.id}>{t.user.name}</option>
                        ))}
                    </select>
                    {errors.teacher_id && <div className="invalid-feedback">{errors.teacher_id}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
                <Link href={route('admin.subject.index')} className="btn btn-secondary ms-2">Kembali</Link>
            </form>
        </AuthenticatedLayout>
    );
}
