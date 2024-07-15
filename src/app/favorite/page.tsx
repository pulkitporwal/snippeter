"use client"

import React from 'react'
import Sidebar from '../../GlobalComponents/Sidebar'
import ProfileUser from '@/GlobalComponents/TopBar/ProfileUser';
import SearchBar from '@/GlobalComponents/TopBar/SearchBar';
import SideBarMenuIcon from '@/GlobalComponents/TopBar/SideBarMenuIcon';
import FavoriteSection from "./Components/FavoriteSection"
import ContentEditor from '@/GlobalComponents/ContentEditor/ContentEditor';

const page = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="w-full overflow-auto h-screen bg-neutral-900 p-5">
                <TopBar />
                <FavoriteSection />
                <ContentEditor />
            </div>
        </div>
    );
};

const TopBar = () => {
    return (
        <div className="rounded-lg flex justify-between mb-2 items-center bg-neutral-800 p-3">
            <ProfileUser />
            <SearchBar />
            <SideBarMenuIcon />
        </div>
    );
};


export default page