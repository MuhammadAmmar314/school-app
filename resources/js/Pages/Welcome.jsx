import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Selamat Datang di Aplikasi Sekolah</h1>
                    <p className="lead">Laravel {laravelVersion} • PHP {phpVersion}</p>
                </div>

                <div className="d-flex gap-3">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="btn btn-primary">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="btn btn-outline-primary">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
