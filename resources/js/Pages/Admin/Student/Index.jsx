import { showConfirmToast } from '@/Components/ConfirmToast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, students }) {
    const { props } = usePage();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const columns = [
        {
            name: 'No',
            selector: (row, index) => (index + 1) + (perPage * (currentPage -1 )),
            width: '70px'
        },
        {
            name: 'Nama',
            selector: row => row.user.name,
            sortable: true
        },
        {
            name: 'NIS',
            selector: row => row.nis,
            sortable: true
        },
        {
            name: 'Kelas',
            selector: row => row.kelas.nama,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.user.email,
            sortable: true
        },
        {
            name: 'Aksi',
            selector: row => (
                <div>
                    <a href={route('admin.student.edit', row.id)} className='btn btn-sm btn-warning me-2'>Edit</a>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.id)}>Hapus</button>
                </div>
            )
        }
    ];

    const handleDelete = (id) => {
        showConfirmToast('Hapus siswa ini?', () => {
            router.delete(route('admin.student.destroy', id));
        });
    }

    useEffect(() => {
        if(props.flash?.success){
            toast.success(props.flash.success)
        }
    }, [props.flash?.success])
    return (
        <AuthenticatedLayout user={auth.user} header="Data Student">
            <Head title="Data Student" />
            <div className="d-flex justify-content-between mb-3">
                <h4>Student List</h4>
                <Link href={route('admin.student.create')} className="btn btn-primary btn-sm">Add Student</Link>
            </div>
            <DataTable
                columns={columns}
                data={students}
                pagination
                paginationDefaultPage={currentPage}
                paginationPerPage={perPage}
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
