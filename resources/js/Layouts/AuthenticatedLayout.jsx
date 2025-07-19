import { Link, Head } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <>
            <ToastContainer />
            <Head />

            {/* Topbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    {/* Button toggle sidebar on mobile */}
                    <button
                        className="btn btn-outline-light d-lg-none me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarMenu"
                    >
                        ☰
                    </button>

                    <Link className="navbar-brand" href="/dashboard">SekolahApp</Link>

                    <div className="d-flex ms-auto">
                        <span className="navbar-text text-white me-3">Hi, {user.name}</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="btn btn-outline-light btn-sm"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <div
                    className="offcanvas-lg offcanvas-start bg-dark text-white p-3"
                    tabIndex="-1"
                    id="sidebarMenu"
                    style={{ width: '250px' }}
                >
                    <div className="offcanvas-header d-lg-none">
                        <h5 className="offcanvas-title">Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body p-0">
                        <nav className="nav flex-column">
                            <Link href="/dashboard" className="nav-link text-white">Dashboard</Link>
                            <Link href="/admin/student" className="nav-link text-white">Data Siswa</Link>
                            <Link href="/admin/teacher" className="nav-link text-white">Data Guru</Link>
                            <Link href="/admin/kelas" className="nav-link text-white">Kelas</Link>
                            <Link href="/admin/subject" className="nav-link text-white">Mata Pelajaran</Link>
                            <Link href="/admin/schedule" className="nav-link text-white">Jadwal Kelas</Link>
                            <Link href="#" className="nav-link text-white">Absensi</Link>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow-1 p-4">
                    {header && <h1 className="h3 mb-4">{header}</h1>}
                    {children}
                </div>
            </div>
        </>
    );
}
