import React from 'react'

import './sidebar.css';

import SidebarData from './SidebarData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider'
function Sidebar() {
  return (
    <>
    <div className="Sidebar">

      <div className='adminInfo'>     
      <div className="sidebarAdminVals">
      <li className="adminSideTagLine" id="title">Welcome to Swagimals Admin </li>
      <li className="adminSideBarImg"><AccountCircleIcon  /></li>
        <li 
              className="sidebarAdminData sidebarAdminName" >      
              <div id="icon"> user </div>{" "} : {" "}
              <div id="title"> Jasmeet</div>
              </li>
              <li className="sidebarAdminData sidebarAdminRole">             
                {" "}
              <div id="icon"> Role</div>{" "} :{" "}
              <div id="title"> Admin</div>
              </li>
        </div>          
      </div>
      <Divider className="whiteDivider" light={false}/>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key}
              id={window.location.pathname === val.link ? 'active' : ''}
              className="sidebarRow"
              onClick={() => { window.location.pathname = val.link }}>
                {" "}
              <div id="icon"> {val.icon}</div>{" "}
              <div id="title"> {val.title}</div>
              </li>
                );
        })} 
        </ul> 
   
   </div>
</>
)};
        
  
export default Sidebar;  