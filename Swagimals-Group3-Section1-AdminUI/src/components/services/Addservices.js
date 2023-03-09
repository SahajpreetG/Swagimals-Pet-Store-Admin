import { Component } from "react";
import "./addservice.css";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Input, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, Alert } from "@mui/material";
import { Form } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: "",
      serviceType: "",
      description: "",
      serviceImg: "",
      serviceAdded: false,
      services: [],
      serviceNameError: "",
      sreviceDescError: "",
    };
    this.handleAddService = this.handleAddService.bind(this);
    this.onServiceNameChange = this.onServiceNameChange.bind(this);
    this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onServiceImgChange = this.onServiceImgChange.bind(this);
  }

  onServiceNameChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ serviceName: e.target.value, serviceNameError: "" });
    } else {
      this.setState({
        serviceName: e.target.value,
        serviceNameError:
          "Rejects inputs that contain any digits, special characters, or symbols",
      });
    }
  }
  onServiceTypeChange(e) {
    this.setState({ serviceType: e.target.value });
  }

  onDescriptionChange(e) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      this.setState({ description: e.target.value, sreviceDescError: "" });
    } else {
      this.setState({
        description: e.target.value,
        sreviceDescError:
          "Rejects inputs that contain any digits, special characters, or symbols",
      });
    }
  }

  onServiceImgChange(e) {
    console.log("serviceImg =", e.target.value);
    this.setState({ serviceImg: e.target.value });
  }

  async handleAddService(e) {
    e.preventDefault();
    if (this.state.serviceNameError || this.state.sreviceDescError) {
      return alert("Errors check the form and submit again");
    }
    console.log("VALUES", this.state.serviceName);
    var ServiceData = {
      serviceName: this.state.serviceName,
      serviceType: this.state.serviceType,
      description: this.state.description,
      serviceImg: this.state.serviceImg,
    };

    try {
      let res = await fetch("http://localhost:5152/api/addServices", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          ServiceData: ServiceData,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("service added");
        this.fetchServices();
        this.setState({
          serviceAdded: true,
        });
        // <Alert severity="success">Service Added!</Alert>
      } else {
        console.log("service not added");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async fetchServices() {
    try {
      let res = await fetch("http://localhost:5152/api/services", {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      console.log("FETCHED CATEGORIES", resJson);
      if (res.status === 200) {
        this.setState({ services: resJson });
        console.log("UPDATED SERVICES", this.state.services);
      } else {
        console.log("services not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async handleDeleteService(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/deleteService/${id}`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("service deleted");
        this.fetchServices();
      } else {
        console.log("service not deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchServices();
  }

  render() {
    const columns = [
      { field: "serviceName", headerName: "Service Name", flex: 1 },
      { field: "serviceType", headerName: "Service Type", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "serviceImg",
        headerName: "Service Image",
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
            onClick={() => this.handleDeleteService(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    return (
      <div className='container'>
        <form onSubmit={this.handleAddService}>
          <h1 className='Title'>Service</h1>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Service Name <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "10px", marginBottom: "10px" }}
                placeholder='Enter Service Name'
                value={this.state.serviceName}
                name='serviceName'
                onChange={this.onServiceNameChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.serviceNameError)}
                helperText={this.state.serviceNameError}
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
              <InputLabel className='labelLike'>Service Type <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <Select
                onChange={this.onServiceTypeChange}
                className='textfield-spacing select-width'
                variant='outlined'
                name='serviceType'
                
                displayEmpty="true"
                required
              >
                <InputLabel>Service Type</InputLabel>
                <MenuItem value={"grooming"}>Grooming</MenuItem>
                <MenuItem value={"domestice training"}>
                  Domestice Training
                </MenuItem>
                <MenuItem value={"washing"}>Washing</MenuItem>
                <MenuItem value={"general health"}>General Health</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
            required
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Service Description <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px" }}
                placeholder='Enter Description'
                value={this.state.description}
                name='description'
                onChange={this.onDescriptionChange}
                className='textfield-spacing'
                variant='outlined'
                error={Boolean(this.state.sreviceDescError)}
                helperText={this.state.sreviceDescError}
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
              <InputLabel className='labelLike' style={{ marginleft: "40px" }}>
                Service Image <sup><strong>*</strong></sup>
              </InputLabel>
            </Grid>
            <Grid item lg={3} md={1} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px", width: "56%" }}
                accept='image/*'
                name='serviceImg'
                type='file'
                onChange={this.onServiceImgChange}
                required
              />
            </Grid>
          </Grid>

          <Button
            className='textfield-spacing'
            type='submit'
            variant='contained'
            color='primary'
          >
            Add Service
          </Button>
          <br></br>
          {this.state.serviceAdded ? (
            <Alert severity='success'>Service Added!</Alert>
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
          {this.state.services.length > 0 ? (
            <DataGrid
              width={400}
              rows={this.state.services.map((service) => ({
                id: service._id,
                serviceName: service.serviceName,
                serviceType: service.serviceType,
                description: service.description,
                serviceImg: service.serviceImg,
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
    //       <h1 className="Title">Service</h1>
    //       <form className="ServiceForm" onSubmit={this.handleAddService}>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Service Name</label>
    //             <input
    //               type="text"
    //               name="serviceName"
    //               placeholder="Service"
    //               value={this.state.serviceName}
    //               required
    //               onChange={this.onServiceNameChange}
    //               style={{ width: "197px" }}
    //             />
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Service Type</label>
    //             <select
    //               onChange={this.onServiceTypeChange}
    //               className="textfield-spacing select-width"
    //               variant="outlined"
    //               name="categoryPet"
    //               displayEmpty="true"
    //               style={{ width: "218px", height: "43px" }}
    //             >
    //               {" "}
    //               <option value="">Choose a service type</option>
    //               <option value={"Grooming"}>Grooming</option>
    //               <option value={"Domestic Training"}>Domestic Training</option>
    //               <option value={"Washing"}>Washing</option>
    //               <option value={"General Health"}>General Health</option>
    //             </select>
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label> Service Description</label>
    //             <input
    //               type="text"
    //               name="description"
    //               placeholder="Description"
    //               value={this.state.description}
    //               required
    //               onChange={this.onDescriptionChange}
    //               style={{ width: "195px" }}
    //             />
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Upload Service Image</label>
    //             <input
    //               accept="image/jpg, image/png, image/jpeg"
    //               name="serviceImg"
    //               type="file"
    //               onChange={this.onServiceImgChange}
    //               style={{ width: "195px" }}
    //             />
    //           </div>
    //         </div>
    //         <br></br>
    //         <Button
    //           className="textfield-spacing"
    //           type="submit"
    //           variant="contained"
    //           color="primary"
    //         >
    //           Add Service
    //         </Button>
    //         <br></br>
    //         {this.state.serviceAdded ? (
    //           <Alert severity="success">Service Added!</Alert>
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
    //       {this.state.services.length > 0 ? (
    //         <DataGrid
    //           width={400}
    //           rows={this.state.services.map((service) => ({
    //             id: service._id,
    //             serviceName: service.serviceName,
    //             serviceType: service.serviceType,
    //             description: service.description,
    //             serviceImg: service.serviceImg,
    //           }))}
    //           columns={columns}
    //           pageSize={5}
    //           rowsPerPageOptions={[5]}
    //           checkboxSelection
    //         />
    //       ) : (
    //         <p>Loading data...</p>
    //       )}
    //     </div>
    //   </div>
    // );
  }
}