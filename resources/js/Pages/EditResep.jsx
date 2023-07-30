import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';

export default function EditResep(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        const data = {
            id: props.myResep.id, title, description, category
        }
        Inertia.post('/resep/update', data)
        setTitle('')
        setDescription('')
        setCategory('')
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Resep</h2>}
        >
            <Head title='Edit Resep' />
            <div className='min-h-screen bg-[#F6F3EE]'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-8'>
                    <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myResep.title} />
                    <textarea type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" style={{ height: '200px' }} onChange={(description) => setDescription(description.target.value)} defaultValue={props.myResep.description} />
                    <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(category) => setCategory(category.target.value)} defaultValue={props.myResep.category} />
                    <button className='btn btn-outline bg-[#4E966E] text-white m-2' onClick={() => handleSubmit()}>Update</button>
                </div>
            </div>
        </AuthenticatedLayout>
        // </div>
    );
}