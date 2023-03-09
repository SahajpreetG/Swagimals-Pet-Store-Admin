import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddService from './components/services/Addservices';
import Addblogs from './components/blogs/Addblogs';
import NotFound from "./components/NotFound/NotFound";
import Layout from './layout';
import Dashboard from './components/Dashboard/Dashboard';
import AddCategory from './components/Categories/addCategory';
import AddPet from './components/Pets/addPet'
import AddProduct from './components/Products/addProduct'
function MyRoutes() {
  return (
    <>
      <BrowserRouter>
        {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/blogs"  element={<Addblogs />}/>
            <Route path="/services" element={<AddService/>} />
            <Route path="/category" element={<AddCategory/>} />
            <Route path="/pets" element={<AddPet/>} />
            <Route path="/products" element={<AddProduct/>} />
            <Route component={NotFound} />
          </Routes>
        {/* </Layout> */}
      </BrowserRouter>
    </>
  )
}

export default MyRoutes;