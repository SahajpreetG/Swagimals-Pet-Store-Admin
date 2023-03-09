import React from 'react'
import Icon from '@mui/material/Icon';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CategoryIcon from '@mui/icons-material/Category';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CreateIcon from '@mui/icons-material/Create';
import PetsIcon from '@mui/icons-material/Pets';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import RssFeedIcon from '@mui/icons-material/RssFeed';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeSharpIcon/>,
        link: "/dashboard"
    },
    // {
    //     title: "Brand",
    //     icon: <LocalActivityIcon/>,
    //     link: "/brand"
    // },
    {
        title: "Category",
        icon: <CategoryIcon/>,
        link: "/category"
    },
    {
        title: "Pets",
        icon: <PetsIcon/>,
        link: "/pets"
    },
    {
        title: "Products",
        icon: <CreateIcon/>,
        link: "/products"
    },
    {
        title: "Services",
        icon: <MiscellaneousServicesIcon/>,
        link: "/services"
    },
    {
        title:"Blogs",
        icon:<RssFeedIcon/>,
        link:"/blogs"
    },
    {
        title:"Reports",
        icon:<TimelineIcon/>,
        link:"/report"
    }

]

export default SidebarData