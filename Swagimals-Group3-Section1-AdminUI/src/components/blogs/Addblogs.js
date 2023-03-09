import { Component } from "react";
import "./addblogs.css";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Input, Grid,InputAdornment, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, Alert } from "@mui/material";
import { Form } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";

export default class blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Content: "",
      Image: "",
      blogs: [],
      BlogTitleError: "",
      BlogContentError: "",
      serviceAdded: false,
    };
    this.handleAddblogs = this.handleAddblogs.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  onTitleChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ Title: e.target.value, BlogTitleError: "" });
    } else {
      this.setState({
        Title: e.target.value,
        BlogTitleError: "Title cant be empty",
      });
    }
  }
  onContentChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ Content: e.target.value, BlogContentError: "" });
    } else {
      this.setState({
        Content: e.target.value,
        BlogContentError: "Description cant be empty",
      });
    }
  }

  onImageChange(e) {
    this.setState({ Image: e.target.value });
  }

  async handleAddblogs(e) {
    e.preventDefault();
    console.log("VALUES", this.state.Title);
    var BlogsData = {
      Title: this.state.Title,
      Content: this.state.Content,
      Image: this.state.Image,
    };

    try {
      let res = await fetch("http://localhost:5152/api/addBlogs", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give request {} in server
        body: JSON.stringify({
          BlogsData: BlogsData,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("New Blog added");
        this.setState({
          serviceAdded: true,
        });
        this.fetchBlogs();
      } else {
        console.log("error ");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async fetchBlogs() {
    try {
      let res = await fetch("http://localhost:5152/api/blogs", {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      console.log("FETCHED BLOGS", resJson);
      if (res.status === 200) {
        this.setState({ blogs: resJson });
        console.log("UPDATED BLOGS", this.state.blogs);
      } else {
        console.log("blogs not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async handleDeleteBlog(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/deleteBlog/${id}`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("blog deleted");
        this.fetchBlogs();
      } else {
        console.log("blog not deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    this.fetchBlogs();
  }

  render() {
    const columns = [
      { field: "Title", headerName: "Blog Title", flex: 1 },
      { field: "Content", headerName: "Blog Content", flex: 1 },
      {
        field: "Image",
        headerName: "Blog Image",
        flex: 1,
        renderCell: (params) => (
          <img src={params.value} style={{ height: 100, width: 50 }} />
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color='secondary'
            onClick={() => this.handleDeleteBlog(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    return (
      <div className='container'>
        <form onSubmit={this.handleAddblogs}>
          <h1 className='Title'>Blog</h1>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Blog Title <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12}>
              <TextField
                style={{ marginTop: "10px", marginBottom: "10px" }}
                value={this.state.Title}
                name='Title'
                onChange={this.onTitleChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.BlogTitleError)}
                helperText={this.state.BlogTitleError}
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
              <InputLabel className='labelLike'>Blog Content <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px" }}
                value={this.state.Content}
                name='Content'
                onChange={this.onContentChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.BlogContentError)}
                helperText={this.state.BlogContentError}
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
              <InputLabel className='labelLike'>Blog Image <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px", width: "56%" }}
                accept='image/*'
                name='blogImage'
                type='file'
                onChange={this.onImageChange}
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
            Add Blog Entry
          </Button>
          <br></br>
          {this.state.serviceAdded ? (
            <Alert severity='success'>New Blog Added!</Alert>
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
          {this.state.blogs.length > 0 ? (
            <DataGrid
              width={400}
              rows={this.state.blogs.map((blog) => ({
                id: blog._id,
                Title: blog.Title,
                Content: blog.Content,
                Image: blog.Image,
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
    // return (
    //   <div className="serviceDTSection">
    //     <div className="newservice serviceForm">
    //     <h1 className="Title">Blogs</h1>
    //     <form className="serviceForm" onSubmit={this.handleAddblogs}>
    //       <div className="NewService">
    //       <div className="row">
    //         <label>Title</label>
    //         <input
    //           type="text"
    //           name="Title"
    //           style={{
    //             marginTop: "5px",
    //             marginBottom: "10px",
    //             width: "197px",
    //           }}
    //           className="textfield-spacing"
    //           variant="outlined"
    //           placeholder="Title"
    //           value={this.state.Title}
    //           onChange={this.onTitleChange}
    //         />
    //         </div>
    //       </div>
    //       <div className="NewService">
    //       <div className="row">
    //         <label>Blog Content</label>
    //         <textarea
    //           type="textarea"
    //           rows="4"
    //           cols="27"
    //           style={{
    //             marginTop: "5px",
    //             marginBottom: "10px",

    //           }}
    //           className="textfield-spacing"
    //           name="Content"
    //           placeholder="Start here..."
    //           value={this.state.Content}
    //           onChange={this.onContentChange}
    //         />
    //         </div>
    //       </div>

    //       <div className="NewService">
    //       <div className="row">
    //         <label>Upload Blog Image</label>
    //         <input
    //           type="file"
    //           accept="image/jpg, image/png, image/jpeg"
    //           name="Image"
    //           value={this.state.Image}
    //           onChange={this.onImageChange}
    //           style={{ width: "195px" }}
    //         />
    //         </div>
    //       </div>
    //       <br></br>
    //         <Button
    //           className="textfield-spacing"
    //           type="submit"
    //           variant="contained"
    //           color="primary"
    //         >
    //           Add New Blog
    //         </Button>
    //         <br></br>
    //         {this.state.serviceAdded ? (
    //           <Alert severity="success">Blog Added!</Alert>
    //         ) : (
    //           ""
    //         )}
    //     </form>
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
    //       {this.state.blogs.length > 0 ? (
    //       <DataGrid
    //         width={400}
    //         rows={this.state.blogs.map((blog) => ({
    //           id: blog._id,
    //           Title: blog.Title,
    //           Content: blog.Content,
    //           Image: blog.Image,
    //         }))}
    //         columns={columns}
    //         pageSize={5}
    //         rowsPerPageOptions={[5]}
    //         checkboxSelection
    //       />
    //       ) : (
    //         <p>Loading data...</p>
    //       )}
    //       </div>
    //   </div>
    // );
  }
}