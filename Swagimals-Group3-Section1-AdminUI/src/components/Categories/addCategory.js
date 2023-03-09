import { Component,prevState } from "react";
import "./addCategory.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Grid, Select, MenuItem, Alert } from "@mui/material";
import { Form } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";

export default class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      categoryPet: "",
      categoryImage: "",
      categoryBanner: "",
      updateCatBanner:"",
      updateDescBanner:"",
      categoryDesc: "",
      serviceAdded: false,
      categories: [],
      categoryNameError: "",
      categoryDescError: "",
      categoryBannerError: "",
      updateCategory: [],
      imageFile: ""
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
    this.onPetChange = this.onPetChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onBannerChange = this.onBannerChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.onUpdatePetChange = this.onUpdatePetChange.bind(this);
    this.onUpdateImageChange = this.onUpdateImageChange.bind(this);
    this.onUpdateBannerChange = this.onUpdateBannerChange.bind(this);
    this.onUpdateDescChange = this.onUpdateDescChange.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleUpdatedCategory = this.handleUpdatedCategory.bind(this);
  }

  onCategoryNameChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ categoryName: e.target.value, categoryNameError: "" });
    } else {
      this.setState({
        categoryName: e.target.value,
        categoryNameError: "Please enter a valid Category Name",
      });
    }
  }

  onPetChange(e) {
    this.setState({ categoryPet: e.target.value });
  }

  onImageChange(e) {
    // this.setState({ categoryImage: e.target.value });
    this.setState({ categoryImage: e.target.value });
  }
  onUpdateImageChange(e) {
    // this.setState({ categoryImage: e.target.value });
    this.setState({ imageFile: e.target.files[0] });
    this.setState({ categoryImage: this.state.imageFile });
  }

  onBannerChange(e) {
    const regex = /^(?:\S+\s*)$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({
        categoryBanner: e.target.value,
        categoryBannerError: "",
      });
    } else {
      this.setState({
        categoryBanner: e.target.value,
        categoryBannerError: "Banner cant be empty",
      });
    }
  }
  onUpdateBannerChange(e) {
    const regex = /^(?:\S+\s*)$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({
        updateCategory: {
          ...prevState.updateCategory,
          categoryBanner: e.target.value
        },
        categoryBannerError: ""
      });
    } else {
      this.setState({
        updateCatBanner: e.target.value,
        categoryBannerError: "Banner cant be empty",
      });
    }
  }
  onUpdatePetChange(e) {
    this.setState({ categoryPet: e.target.textContent})
  }

  onDescChange(e) {
    const regex = /^(?:\S+\s*)$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ categoryDesc: e.target.value, categoryDescError: "" });
    } else {
      this.setState({
        categoryDesc: e.target.value,
        categoryDescError: "Description cant be empty",
      });
    }
  }
  onUpdateDescChange(e) {
    const regex = /^(?:\S+\s*)$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState(prevState => ({
        updateCategory: {
          ...prevState.updateCategory,
          categoryDesc: e.target.value
        },
        categoryDescError: ""
      }));
    } else {
      this.setState({
        updateCategory: {
          ...this.state.updateCategory,
          categoryDesc: e.target.value
        },
        categoryDescError: "Description cant be empty"
      });
    }
  }
  

  async handleAddCategory(e) {
    e.preventDefault();
    // if (
    //   this.state.categoryNameError ||
    //   this.state.categoryBannerError ||
    //   this.state.categoryDescError
    // ) {
    //   return alert("Errors check the form and submit again");
    // }
    console.log("VALUES", this.state.categoryName);
    var categoryData = {
      categoryName: this.state.categoryName,
      categoryPet: this.state.categoryPet,
      categoryImage: this.state.categoryImage,
      categoryBanner: this.state.categoryBanner,
      categoryDesc: this.state.categoryDesc,
    };

    try {
      let res = await fetch("http://localhost:5152/api/addCategory", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          categoryData: categoryData,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
       
        console.log("category added");
        this.fetchCategories();
        this.setState({
          serviceAdded: true,
        });
      } else {
        console.log("category not added");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async handleUpdatedCategory() {
    
  
    // if (
    //   this.state.categoryNameError ||
    //   this.state.categoryBannerError ||
    //   this.state.categoryDescError
    // ) {
    //   return alert("Errors check the form and submit again");
    // }
  
   // console.log("VALUES", this.state.categoryName);

    const categoryData = {
      _id: this.state.updateCategory._id,
      categoryName: this.state.updateCategory.categoryName,
      categoryPet: this.state.updateCategory.categoryPet,
      categoryImage: this.state.categoryImage,        //this.state.updateCategory.categoryImage,
      categoryBanner: this.state.updateCategory.categoryBanner,
      categoryDesc: this.state.updateCategory.categoryDesc,
    };

    console.log("data pulled")

    try {
      const res = await fetch(`http://localhost:5152/api/UpdateCategory`, {
        method: "POST",  
        headers:{
        'Content-Type':'application/json'
        },
        body:  JSON.stringify({data : categoryData})
      }).then((res)=>
      {
        console.log('updated', res);
        this.fetchCategories();
        this.setState({
          serviceAdded: true,
        });
      }).catch((err)=> {
        console.log('error ', err)
      });
  
      debugger;
      //const resJson = await res.json();
      // if (res.status === 200) {
      //   console.log("category updated jas");
      //   this.fetchCategories();
      //   this.setState({
      //     serviceAdded: true,
      //   });
      // } else {
      //   console.log("category not updated jas");
      // }
    } catch (err) {
      console.log(err);
    }
  }
  

  async fetchCategories() {
    try {
      let res = await fetch("http://localhost:5152/api/categories", {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" })
      });
      let resJson = await res.json();
      console.log("FETCHED CATEGORIES", resJson);
      if (res.status === 200) {
        this.setState({ categories: resJson });
        console.log("UPDATED CATEGORIES", this.state.categories);
      } else {
        console.log("categories not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async handleDeleteCategory(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/deleteCategory/${id}`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("category deleted");
        this.fetchCategories();
      } else {
        console.log("category not deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async loadUpdateForm(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/formValues/${id}`, {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      console.log("FETCHED VALUES", resJson);
      if (res.status === 200) {
        this.setState({ updateCategory: resJson });
        console.log("FETCHED VALUES", this.state.updateCategory);
      } else {
        console.log("categories not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    const columns = [
      { field: "categoryName", headerName: "Category Name", flex: 1 },
      { field: "categoryPet", headerName: "Category Pet", flex: 1 },
      {
        field: "categoryImage",
        headerName: "Category Image",
        flex: 1,
        renderCell: (params) => (
          <img src={params.value} style={{ height: 100, width: 50 }} />
        ),
      },
      { field: "categoryBanner", headerName: "Category Banner", flex: 1 },
      { field: "categoryDesc", headerName: "Category Description", flex: 1 },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color="secondary"
            onClick={() => this.handleDeleteCategory(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
      {
        field: "update",
        headerName: "Update",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color="primary"
            onClick={() => this.loadUpdateForm(params.row.id)}
          >
            <UpdateIcon />
          </IconButton>
        ),
      },
    ];

    return (
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <form onSubmit={this.handleAddCategory}>
              <h1 className="Title">Category</h1>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Name{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>{" "}
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{
                      marginTop: "5px",
                      marginBottom: "10px",
                      border: "none",
                    }}
                    className="textfield-spacing"
                    label="Enter Category Name"
                    variant="outlined"
                    name="categoryName"
                    value={this.state.categoryName}
                    onChange={this.onCategoryNameChange}
                    error={Boolean(this.state.categoryNameError)}
                    helperText={this.state.categoryNameError}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Type{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <Select
                    onChange={this.onPetChange}
                    className="textfield-spacing select-width"
                    variant="outlined"
                    name="categoryPet"
                    width="100px"
                    // displayEmpty="true"
                  >
                    <InputLabel>Pet Type</InputLabel>
                    <MenuItem value={"Dog"}>Dog</MenuItem>
                    <MenuItem value={"Cat"}>Cat</MenuItem>
                    <MenuItem value={"Elephant"}>Elephant</MenuItem>
                    <MenuItem value={"Parrot"}>Parrot</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Banner{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{ marginTop: "5px", marginBottom: "10px" }}
                    className="textfield-spacing"
                    label="Enter Category Banner"
                    variant="outlined"
                    name="categoryBanner"
                    value={this.state.categoryBanner}
                    onChange={this.onBannerChange}
                    error={Boolean(this.state.categoryBannerError)}
                    helperText={this.state.categoryBannerError}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Desc{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{ marginTop: "5px", marginBottom: "10px" }}
                    className="textfield-spacing"
                    label="Enter Category Description"
                    variant="outlined"
                    name="categoryDesc"
                    value={this.state.categoryDesc}
                    onChange={this.onDescChange}
                    error={Boolean(this.state.categoryDescError)}
                    helperText={this.state.categoryDescError}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Upload Category Image{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{
                      marginTop: "5px",
                      marginBottom: "10px",
                      width: "56%",
                    }}
                    accept="image/*"
                    name="categoryImage"
                    type="file"
                    onChange={this.onImageChange}
                    required
                  />
                </Grid>
              </Grid>

              <Button
                className="textfield-spacing"
                type="submit"
                variant="contained"
                color="primary"
              >
                Add Category
              </Button>
              <br></br>
              {this.state.serviceAdded ? (
                <Alert severity="success">Category Added!</Alert>
              ) : (
                ""
              )}
            </form>
          </Grid>
          {/* ======================================================================================================================== */}
          <Grid item xs={12} sm={6}>
            <form onSubmit={this.handleUpdatedCategory}>
              <h1 className="Title">Update Category</h1>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Name{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>{" "}
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{
                      marginTop: "5px",
                      marginBottom: "10px",
                      border: "none",
                    }}
                    className="textfield-spacing"
                    variant="outlined"
                    name="categoryName"
                    value={this.state.updateCategory.categoryName}
                    onChange={this.onCategoryNameChange}
                    error={Boolean(this.state.categoryNameError)}
                    helperText={this.state.categoryNameError}
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Type{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    onChange={this.onPetChange}
                    className="textfield-spacing select-width"
                    variant="outlined"
                    name="categoryPet"
                    width="100px"
                    
                    value={this.state.updateCategory.categoryPet}
                    readOnly
                  ></TextField>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Banner{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{ marginTop: "5px", marginBottom: "10px" }}
                    className="textfield-spacing"
                    
                    variant="outlined"
                    name="categoryBanner"
                    value={this.state.updateCategory.categoryBanner}
                    onChange={this.onUpdateBannerChange}
                    // error={Boolean(this.state.categoryBannerError)}
                    // helperText={this.state.categoryBannerError}
                    // required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Category Desc{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <TextField
                    style={{ marginTop: "5px", marginBottom: "10px" }}
                    className="textfield-spacing"
                   
                    variant="outlined"
                    name="categoryDesc"
                    value={this.state.updateCategory.categoryDesc}
                    onChange={this.onUpdateDescChange}
                    // error={Boolean(this.state.categoryDescError)}
                    // helperText={this.state.categoryDescError}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <InputLabel className="labelLike">
                    Upload Category Image{" "}
                    <sup>
                      <strong>*</strong>
                    </sup>
                  </InputLabel>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${this.state.updateCategory.categoryImage})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      width: "100px",
                      height: "100px",
                      display: this.state.updateCategory.categoryImage ? 'block' : 'none'
                    }}
                  />

                  <TextField
                    style={{
                      marginTop: "5px",
                      marginBottom: "10px",
                      width: "56%",
                    }}
                    accept="image/*"
                    name="categoryImage"
                    type="file"
                    value={this.state.categoryImage}
                    onChange={this.onUpdateImageChange}
                  />
                </Grid>
              </Grid>

              <Button
                className="textfield-spacing"
                type="submit"
                variant="contained"
                color="primary"
                
              >
                Add Category
              </Button>
              <br></br>
              {this.state.serviceAdded ? (
                <Alert severity="success">Category Added!</Alert>
              ) : (
                ""
              )}
            </form>
          </Grid> 
        </Grid>
        <div
          style={{
            height: 400,
            width: "90%",
            marginLeft: "60px",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          {this.state.categories.length > 0 ? (
            <DataGrid
              rows={this.state.categories.map((category) => ({
                id: category._id,
                categoryName: category.categoryName,
                categoryPet: category.categoryPet,
                categoryImage: category.categoryImage,
                categoryBanner: category.categoryBanner,
                categoryDesc: category.categoryDesc,
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
