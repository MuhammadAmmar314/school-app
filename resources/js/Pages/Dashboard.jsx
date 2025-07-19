import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard" />

            <div className="alert alert-success">
                Selamat datang, {auth.user.name}! Anda berhasil login.
            </div>

            <div className="row g-3">
                <div className="col-md">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Data Siswa</h5>
                            <p className="card-text">Kelola data siswa di sini.</p>
                            <a href="/admin/student" className="btn btn-primary btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Data Guru</h5>
                            <p className="card-text">Kelola data guru di sini.</p>
                            <a href="/admin/teacher" className="btn btn-primary btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Absensi</h5>
                            <p className="card-text">Pantau absensi siswa & guru.</p>
                            <a href="#" className="btn btn-primary btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Kelas</h5>
                            <p className="card-text">Kelola data kelas di sini.</p>
                            <a href="/admin/kelas" className="btn btn-primary btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Mata Pelajaran</h5>
                            <p className="card-text">Kelola Mata Pelajaran di sini.</p>
                            <a href="/admin/subject" className="btn btn-primary btn-sm">Lihat</a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
