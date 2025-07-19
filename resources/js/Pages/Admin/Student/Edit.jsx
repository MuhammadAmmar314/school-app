import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, student, kelas }){
    const {data, setData, put, processing, errors} = useForm({
            nama : student.user.name,
            email: student.user.email,
            nis : student.nis,
            password : '',
            kelas_id : student.kelas_id
        });
    
    const submit = (e) => {
        e.preventDefault();
        put(route('admin.student.update', student));
    }
    return (
        <AuthenticatedLayout user={auth.user} header='Edit Murid'>
            <Head title='Edit Murid' />
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
                    <label className="form-label">Nomor Induk Siswa</label>
                    <input type="text" className={`form-control ${errors.nis ? 'is-invalid' : ''}`} value={data.nis} onChange={e => setData('nis', e.target.value)} />
                    {errors.nis && <div className="invalid-feedback">{errors.nis}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Kelas</label>
                    <select className={`form-control ${errors.kelas_id ? 'is-invalid' : ''}`} value={data.kelas_id} onChange={(e) => setData('kelas_id', e.target.value)}>
                        <option value="">-- Pilih Kelas --</option>
                        {kelas.map((k) => (
                            <option key={k.id} value={k.id}>{k.nama}</option>
                        ))}
                    </select>
                    {errors.kelas_id && <div className="invalid-feedback">{errors.kelas_id}</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
                <Link href={route('admin.student.index')} className="btn btn-secondary ms-2">Kembali</Link>
            </form>
        </AuthenticatedLayout>
    );
}