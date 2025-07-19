import { showConfirmToast } from '@/Components/ConfirmToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, kelas }) {
    const { props } = usePage();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'No',
            selector: (row, index) => (index + 1) + (perPage * (currentPage - 1) ),
            width: '70px'
        },
        {
            name: 'Kelas',
            selector: row => row.nama,
            sortable: true
        },
        {
            name: 'Jumlah Siswa',
            selector: row => row.students.length,
            sortable: true
        },
        {
            name: 'Aksi',
            selector: row => (
                <div>
                    <a href={`/admin/kelas/${row.id}/edit`} className='btn btn-sm btn-warning me-2'>Edit</a>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.id)}>Hapus</button>
                </div>
            )
        }
    ];

    const handleDelete = (id) => {
        showConfirmToast('Hapus kelas ini?', () => {
            router.delete(route('admin.kelas.destroy', id));
        });
    };

    useEffect(() => {
        if(props.flash?.success){
            toast.success(props.flash.success);
        }
    }, [props.flash?.success])

    return (
        <AuthenticatedLayout user={auth.user} header="Data Kelas">
            <Head title="Data Kelas" />

            <div className="d-flex justify-content-between mb-3">
                <h4>Daftar Kelas</h4>
                <Link href={route('admin.kelas.create')} className="btn btn-primary btn-sm">Tambah Kelas</Link>
            </div>

            <DataTable 
                columns={columns}
                data={kelas}
                pagination
                paginationPerPage={perPage}
                paginationDefaultPage={currentPage}
                paginationRowsPerPageOptions={[5,10,25,50]}
                onChangePage={page => setCurrentPage(page)}
                onChangeRowsPerPage={(newPerPage, page) => {
                    setPerPage(newPerPage);
                    setCurrentPage(page);
                }}
                highlightOnHover
                striped
                dense
            />
        </AuthenticatedLayout>
    );
}
