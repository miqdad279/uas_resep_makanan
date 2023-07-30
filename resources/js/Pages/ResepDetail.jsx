import React from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';

const ResepDetail = ({ resep, auth }) => {
    return (
        <div className='min-h-screen bg-[#F6F3EE] flex flex-col items-center justify-center m-4' style={{ margin: 'auto 0' }}>
            <Navbar user={auth.user} />
            <Head title={resep.title} />
            <div className='flex items-center justify-center text-3xl font-bold m-16'>{resep.title}</div>
            <div>
                <div className="text-lg mb-2">Penulis: {resep.author}</div>
                <div className="text-lg mb-6">Kategori: {resep.category}</div>
                <pre className="w-full max-w-screen-lg overflow-x-auto whitespace-pre-wrap mb-16">{resep.description}</pre>
            </div>
        </div>
    );
};

export default ResepDetail;
