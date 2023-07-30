import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/resep', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.myResep) {
            Inertia.get('/resep')
        }
        return;
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Resep Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
                        {isNotif && <div className="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{props.flash.message}</span>
                        </div>}
                        <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} value={title} />
                        <textarea type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" style={{ height: '200px' }} onChange={(description) => setDescription(description.target.value)} value={description} />
                        <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(category) => setCategory(category.target.value)} value={category} />
                        <button className='btn btn-outline text-white bg-[#4E966E] m-2' onClick={() => handleSubmit()}>Bagikan</button>
                        {props.myResep && props.myResep.length > 0 ? props.myResep
                            .sort((a, b) => b.id - a.id)
                            .map((resep, i) => {
                                return (
                                    <div key={i} className="card w-full md:w-auto bg-base-100 shadow-xl mt-10">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {resep.title}
                                            </h2>
                                            {/* <p>description</p> */}
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-inline">{resep.category}</div>
                                                <div className="badge badge-outline">
                                                    <Link href={route('edit.resep')} method='get' data={{ id: resep.id }} as='button'>
                                                        Edit
                                                    </Link>
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link href={route('delete.resep')} method='post' data={{ id: resep.id }} as='button'>
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>Anda belum belum memiliki resep</p>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
