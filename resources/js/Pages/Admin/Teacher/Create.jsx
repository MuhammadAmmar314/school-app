import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({ nama: '', nip: '', email: '', password: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.teacher.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Tambah Guru">
            <Head title="Tambah Guru" />
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input type="text" className={`form-control ${errors.nama ? 'is-invalid' : ''}`} value={data.nama} onChange={e => setData('nama', e.target.value)} />
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Nomor Induk Pegawai</label>
                    <input type="text" className={`form-control ${errors.nip ? 'is-invalid' : ''}`} value={data.nip} onChange={e => setData('nip', e.target.value)} />
                    {errors.nip && <div className="invalid-feedback">{errors.nip}</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
                <Link href={route('admin.teacher.index')} className="btn btn-secondary ms-2">Kembali</Link>
            </form>
        </AuthenticatedLayout>
    );
}
