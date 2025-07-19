import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({ nama: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.kelas.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Tambah Kelas">
            <Head title="Tambah Kelas" />
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Nama Kelas</label>
                    <input type="text" className={`form-control ${errors.nama ? 'is-invalid' : ''}`} value={data.nama} onChange={e => setData('nama', e.target.value)} />
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
                <Link href={route('admin.kelas.index')} className="btn btn-secondary ms-2">Kembali</Link>
            </form>
        </AuthenticatedLayout>
    );
}
