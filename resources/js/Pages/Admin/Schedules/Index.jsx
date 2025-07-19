import { showConfirmToast } from "@/Components/ConfirmToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, schedules })
{
    const { props } = usePage();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            name: 'No',
            selector: (row,index) => (index + 1) + (perPage + (currentPage - 1)),
            width: '70px'
        },
        {
            name: 'Kelas',
            selector: row => row.kelas.nama,
            sortable: true
        },
        {
            name: 'Mata Pelajaran',
            selector: row => row.subject.nama,
            sortable: true
        },
        {
            name: 'Guru',
            selector: row => row.teacher.user.name,
            sortable: true
        },
        {
            name: 'Hari',
            selector: row => row.hari,
            sortable: true
        },
        {
            name: 'JP Mulai',
            selector: row => row.jp_mulai,
            sortable: true
        },
        {
            name: 'Jumlah JP',
            selector: row => row.jumlah_jp,
            sortable: true
        },
        {
            name: 'Aksi',
            selector: row => (
                <div>
                    <a href={route('admin.schedule.edit', row.id)} className='btn btn-sm btn-warning me-2'>Edit</a>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.id)}>Hapus</button>
                </div>
            )
        }
    ];

    useEffect(() => {
        if(props.flash?.success){
            toast.success(props.flash.success);
        }
    }, [props.flash?.success]);

    const handleDelete = (id) => {
        showConfirmToast('Hapus Jadwal ini?', ()=> {
            router.delete(route('admin.schedule.destroy', id));
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Data Jadwal Kelas">
            <Head title="Data Jadwal Kelas" />

            <div className="d-flex justify-content-between mb-3">
                <h4>Daftar Jadwal</h4>
                <Link href={route('admin.schedule.create')} className="btn btn-primary btn-sm">Tambah Jadwal</Link>
            </div>

            <DataTable 
                columns={columns}
                data={schedules}
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