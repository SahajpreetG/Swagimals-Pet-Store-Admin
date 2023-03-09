import { Component } from "react";
import "./addProduct.css";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Input } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, Alert, Grid } from "@mui/material";
import { Form } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";

export default class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productRating: "",
      productDesc: "",
      productImage: "",
      productPrice: "",
      serviceAdded: false,
      products: [],
      productNameError: "",
      productDescError: "",
      productPriceError: "",
    };
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.onProductNameChange = this.onProductNameChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onProductDescChange = this.onProductDescChange.bind(this);
    this.onProductImageChange = this.onProductImageChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
  }
  onProductNameChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ productName: e.target.value, productNameError: "" });
    } else {
      this.setState({
        productName: e.target.value,
        productNameError:
          "reject inputs that contain any digits, special characters, or symbols.For Ex.Dog Food",
      });
    }
  }
  onRatingChange(e) {
    this.setState({ productRating: e.target.value });
  }
  onProductDescChange(e) {
    const regex = /^(?:\S+\s*)$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ productDesc: e.target.value, productDescError: "" });
    } else {
      this.setState({
        productDesc: e.target.value,
        productDescError: "Description cant be empty",
      });
    }
  }

  onProductImageChange(e) {
    this.setState({ productImage: e.target.value });
  }

  onPriceChange(e) {
    const regex = /^\d+(\.\d{1,2})?$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ productPrice: e.target.value, productPriceError: "" });
    } else {
      this.setState({
        productPrice: e.target.value,
        productPriceError:
          "Please enter a valid price with up to 2 decimal places.",
      });
    }
  }

  async handleAddProduct(e) {
    e.preventDefault();
    if (
      this.state.productNameError ||
      this.state.productPriceError ||
      this.state.productDescError
    ) {
      return alert("Errors check the form and submit again");
    }
    console.log("VALUES", this.state.productName);
    var productData = {
      productName: this.state.productName,
      productRating: this.state.productRating,
      productDesc: this.state.productDesc,
      productImage: this.state.productImage,
      productPrice: this.state.productRating,
    };

    try {
      let res = await fetch("http://localhost:5152/api/addProduct", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give reuest {} in server
        body: JSON.stringify({
          productData: productData,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("product added");
        this.setState({
          serviceAdded: true,
        });
        this.fetchProducts();
      } else {
        console.log("product not added");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async fetchProducts() {
    try {
      let res = await fetch("http://localhost:5152/api/products", {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      console.log("FETCHED PRODUCTS", resJson);
      if (res.status === 200) {
        this.setState({ products: resJson });
        console.log("UPDATED PETS", this.state.products);
      } else {
        console.log("Products not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleDeleteProduct(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/deleteProduct/${id}`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("product deleted");
        this.fetchProducts();
      } else {
        console.log("product not deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    this.fetchProducts();
  }
  render() {
    const columns = [
      { field: "productName", headerName: "Product Name", flex: 1 },
      { field: "productRating", headerName: "Product Rating", flex: 1 },
      { field: "productDesc", headerName: "Product Description", flex: 1 },
      {
        field: "productImage",
        headerName: "Product Image",
        flex: 1,
        renderCell: (params) => (
          <img src={params.value} style={{ height: 100, width: 50 }} />
        ),
      },
      { field: "petPrice", headerName: "Product Price", flex: 1 },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color='secondary'
            onClick={() => this.handleDeleteProduct(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    // return (
    //   <div className="serviceDTSection">
    //     <div className="newservice serviceForm">
    //       <h1 className="Title">Product</h1>
    //       <form className="ServiceForm" onSubmit={this.handleAddProduct}>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Product Name</label>
    //             <input
    //               type="text"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "197px",
    //                 height: "24px"
    //               }}
    //               className="textfield-spacing"
    //               variant="outlined"
    //               name="productName"
    //               placeholder="Enter product name"
    //               value={this.state.productName}
    //               onChange={this.onProductNameChange}
    //             />
    //           </div>
    //         </div>

    //         <div className="NewService">
    //           <div className="row">
    //             <label>Product Rating</label>
    //             <select
    //               onChange={this.onRatingChange}
    //               className="textfield-spacing select-width"
    //               variant="outlined"
    //               name="productRating"

    //               displayEmpty="true"
    //               style={{ width: "218px", height: "45.5px" }}
    //             >
    //               <option value={""}>Choose the Product Rating</option>
    //               <option value={"1"}>1</option>
    //               <option value={"2"}>2</option>
    //               <option value={"3"}>3</option>
    //               <option value={"4"}>4</option>
    //               <option value={"5"}>5</option>
    //             </select>
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Enter Product Desc</label>
    //             <input
    //               type="text"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "195px",
    //                 height: "23px"
    //               }}
    //               className="textfield-spacing"
    //               variant="outlined"
    //               name="productDesc"
    //               placeholder="Product description"
    //               value={this.state.productDesc}
    //               onChange={this.onProductDescChange}
    //             />
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Upload Product Image</label>
    //             <input
    //               accept="image/jpg, image/png, image/jpeg"
    //               name="productImage"
    //               type="file"
    //               onChange={this.onProductImageChange}
    //               style={{ width: "195px", height: "23px" }}
    //             />
    //           </div>
    //         </div>

    //         <div className="NewService">
    //           <div className="row">
    //             <label>Enter Product Price ($)</label>
    //             <input
    //               type="text"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "195px",
    //                 height: "22px"
    //               }}
    //               className="textfield-spacing"
    //               variant="outlined"
    //               placeholder="Price"
    //               name="productPrice"
    //               value={this.state.productPrice}
    //               onChange={this.onPriceChange}
    //             />
    //           </div>
    //         </div>
    //         {/* <button type="submit" className="newServiceButton">Create</button> */}
    //         <br></br>
    //         <Button
    //           className="textfield-spacing"
    //           type="submit"
    //           variant="contained"
    //           color="primary"
    //         >
    //           Add Product
    //         </Button>
    //         <br></br>
    //         {this.state.serviceAdded ? (
    //           <Alert severity="success">Product Added!</Alert>
    //         ) : (
    //           ""
    //         )}
    //       </form>
    //     </div>
    //     <div
    //       style={{
    //         height: 400,
    //         width: "90%",
    //         marginLeft: "60px",
    //         marginBottom: "40px",
    //         marginTop: "20px",
    //       }}
    //     >
    //     {this.state.products.length > 0 ? (
    //       <DataGrid
    //         width={400}
    //         rows={this.state.products.map((product) => ({
    //                     id: product._id,
    //                     productName: product.productName,
    //                     productRating: product.productRating,
    //                     productDesc: product.productDesc,
    //                     productImage: product.productImage,
    //                     productPrice: product.productPrice,
    //                   }))}
    //         columns={columns}
    //         pageSize={5}
    //         rowsPerPageOptions={[5]}
    //         checkboxSelection
    //       />
    //       ) : (
    //         <p>Loading data...</p>
    //       )}

    //     </div>
    //   </div>
    // );
    return (
      <div className='container'>
        <form onSubmit={this.handleAddProduct}>
        <h1 className="Title">Product</h1>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Product Name <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "10px", marginBottom: "10px" }}
                label='Enter Product Name'
                value={this.state.productName}
                name='productName'
                onChange={this.onProductNameChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.productNameError)}
                helperText={this.state.productNameError}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Product Rating <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <Select
                onChange={this.onRatingChange}
                className='textfield-spacing select-width'
                variant='outlined'
                name='productRating'
                width='100px'
                displayEmpty='true'
                required
              >
                <InputLabel>Enter Product Rating</InputLabel>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Product Description <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px" }}
                label='Enter Product Description'
                value={this.state.productDesc}
                name='productDesc'
                onChange={this.onProductDescChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.productDescError)}
                helperText={this.state.productDescError}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Product Image <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px", width: "56%" }}
                accept='image/*'
                name='productImage'
                type='file'
                onChange={this.onProductImageChange}
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Product Price <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px" }}
                label='Enter Product Price'
                value={this.state.productPrice}
                name='productPrice'
                onChange={this.onPriceChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.productPriceError)}
                helperText={this.state.productPriceError}
                required
              />
            </Grid>
          </Grid>

          {/* <TextField style={{marginTop: "10px", marginBottom: "10px"}}
            label="Enter Product Name"
            value={this.state.productName}
            name="productName"
            onChange={this.onProductNameChange}
            className="textfield-spacing"
            variant="outlined"
          /> */}
          {/* <Select 
            onChange={this.onRatingChange} 
            className="textfield-spacing select-width"
            variant="outlined"
            name="productRating"
            width="100px"
            displayEmpty="true"
            >
            <InputLabel>Enter Product Rating</InputLabel>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            
         </Select> */}

          {/* <TextField style={{marginTop: "5px", marginBottom: "10px"}}
            label="Enter Product Description"
            value={this.state.productDesc}
            name="productDesc"
            onChange={this.onProductDescChange}
            className="textfield-spacing"
            variant="outlined"
          /> */}
          {/* <TextField style={{marginTop: "5px", marginBottom: "10px"}}
            label="Upload Product Image"
            value={this.state.productImage}
            name="productImage"
            onChange={this.onProductImageChange}
            className="textfield-spacing"
            variant="outlined"
          /> */}
          {/* <TextField style={{marginTop: "5px", marginBottom: "10px"}}
            label="Enter Product Price"
            value={this.state.productPrice}
            name="productPrice"
            onChange={this.onPriceChange}
            className="textfield-spacing"
            variant="outlined"
          /> */}
          <Button
            className='textfield-spacing'
            type='submit'
            variant='contained'
            color='primary'
          >
            Add Product
          </Button>
          <br></br>
          {this.state.serviceAdded ? (
            <Alert severity='success'>Product Added!</Alert>
          ) : (
            ""
          )}
        </form>
        <div
          style={{
            height: 400,
            width: "90%",
            marginLeft: "60px",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          {this.state.products.length > 0 ? (
            <DataGrid
              width={400}
              rows={this.state.products.map((product) => ({
                id: product._id,
                productName: product.productName,
                productRating: product.productRating,
                productDesc: product.productDesc,
                productImage: product.productImage,
                productPrice: product.productPrice,
              }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    );
  }
}