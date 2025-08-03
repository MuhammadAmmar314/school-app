import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, subject }){
    const {data, setData, put, processing, errors} = useForm({
        nama: subject.nama
    });
    const submit = (e) => {
        e.preventDefault();
        put(route('admin.subject.update', subject));
    }
    return (
        <AuthenticatedLayout user={auth.user} header='Tambah Mata Pelajaran'>
            <Head title='Tambah Mata Pelajaran'/>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Nama Mata Pelajaran</label>
                    <input type="text" className={`form-control ${errors.nama ? 'is-invalid' : ''}`} value={data.nama} onChange={(e) => setData('nama', e.target.value)}/>
                    {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Simpan</button>
                <Link href={route('admin.subject.index')} className="btn btn-secondary ms-2">Kembali</Link>
            </form>
        </AuthenticatedLayout>
    );
}
