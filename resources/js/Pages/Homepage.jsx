import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ResepList from '@/Components/Homepage/ResepList';
import Paginator from '@/Components/Homepage/Paginator';


export default function Homepage(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredResep = props.resep.data.filter((resep) => {
        return resep.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className='min-h-screen bg-[#F6F3EE]'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} onSearch={handleSearch} />
            <h1 className='text-center pt-10 text-3xl font-bold' dangerouslySetInnerHTML={{ __html: props.description.replace('\n', '<br>') }}></h1>
            <div className='flex justify-center p-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {searchQuery ? (
                        <ResepList resep={filteredResep} />
                    ) : (
                        <ResepList resep={props.resep.data} />
                    )}
                </div>
            </div>
            <div className='flex justify-center items-center py-4'>
                <Paginator meta={props.resep.meta} />
            </div>
        </div>
    );
}