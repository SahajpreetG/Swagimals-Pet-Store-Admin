import React from 'react'
import MyRoutes from './MyRoutes'
import Sidebar from './components/SideBar/Sidebar';

import './App.css';

function Layout() {
    return (
            <div className='layoutContainer'>
                <Sidebar />
                <MyRoutes />
            </div>
        
    )
}
export default Layout;