import { Component } from "react";
import "./addPet.css";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Input, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, Alert } from "@mui/material";
import { Form } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
// import label from "@mui/material/label";
export default class PetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // petName: "",
      // petPrice: "",
      petBreed: "",
      petImage: "",
      petRating: "",
      pets: [],
      petType: "",

      serviceAdded: false,
    };

    this.handleAddPet = this.handleAddPet.bind(this);
    // this.onPetNameChange = this.onPetNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onBreedChange = this.onBreedChange.bind(this);
    this.onPetImageChange = this.onPetImageChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.handleDeletePet = this.handleDeletePet.bind(this);
    this.onPetTypeChange = this.onPetTypeChange.bind(this);
  }

  onPetTypeChange(e) {
    this.setState({ petType: e.target.value });
  }

  onPetNameChange(e) {
    this.setState({ petName: e.target.value });
  }
  onPriceChange(e) {
    this.setState({ petPrice: e.target.value });
  }
  onBreedChange(e) {
    this.setState({ petBreed: e.target.value });
  }

  onPetImageChange(e) {
    this.setState({ petImage: e.target.value });
  }

  onRatingChange(e) {
    this.setState({ petRating: e.target.value });
  }

  async handleAddPet(e) {
    e.preventDefault();
    console.log("VALUES", this.state.petName);
    var petData = {
      // petName: this.state.petName,
      petPrice: this.state.petPrice,
      petBreed: this.state.petBreed,
      petImage: this.state.petImage,
      petRating: this.state.petRating,
      petType: this.state.petType,
    };

    try {
      let res = await fetch("http://localhost:5152/api/addPet", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }), //else will give reuest {} in server
        body: JSON.stringify({
          petData: petData,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("pet added");
        this.setState({
          serviceAdded: true,
        });
        this.fetchPets();
      } else {
        console.log("pet not added");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async fetchPets() {
    try {
      let res = await fetch("http://localhost:5152/api/pets", {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      console.log("FETCHED PETS", resJson);
      if (res.status === 200) {
        this.setState({ pets: resJson });
        console.log("UPDATED PETS", this.state.pets);
      } else {
        console.log("Pets not fetched");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async handleDeletePet(id) {
    try {
      let res = await fetch(`http://localhost:5152/api/deletePet/${id}`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("pet deleted");
        this.fetchPets();
      } else {
        console.log("pet not deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    this.fetchPets();
  }
  render() {
    const columns = [
      // { field: "petName", headerName: "Pet Name", flex: 1 },
      { field: "petType", headerName: "Pet Type", flex: 1 },

      { field: "petBreed", headerName: "Pet Breed", flex: 1 },
      {
        field: "petImage",
        headerName: "Pet Image",
        flex: 1,
        renderCell: (params) => (
          <img src={params.value} style={{ height: 100, width: 50 }} />
        ),
      },
      { field: "petRating", headerName: "Pet Rating", flex: 1 },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color='secondary'
            onClick={() => this.handleDeletePet(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
    // return (
    //   <div className="serviceDTSection">
    //     <div className="newservice serviceForm">
    //       <h1 className="Title">Pet</h1>
    //       <form className="ServiceForm" onSubmit={this.handleAddPet}>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Pet Type</label>
    //             <select
    //               onChange={this.onPetTypeChange}
    //               className="textfield-spacing select-width"
    //               variant="outlined"
    //               name="petType"
    //               width="100px"
    //               displayEmpty="true"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "220px",
    //                 height: "45px",
    //               }}
    //             >
    //               <option value={""}>Choose pet type</option>
    //               <option value={"dog"}>Dog</option>
    //               <option value={"cat"}>Cat</option>
    //               <option value={"fish"}>Fish</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="NewService">
    //           <div className="row">
    //             <label>Pet Breed</label>
    //             <select
    //               onChange={this.onBreedChange}
    //               className="textfield-spacing select-width"
    //               variant="outlined"
    //               name="petBreed"
    //               width="100px"
    //               displayEmpty="true"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "220px",
    //                 height: "42px",
    //               }}
    //             >
    //               <option value={""}>Choose pet breed</option>
    //               <option value={"dog"}>Dog</option>
    //               <option value={"husky"}>Husky</option>
    //               <option value={"pug"}>Pug</option>
    //               <option value={"Pusky"}>Pusky</option>
    //             </select>
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Upload Pet Image</label>
    //             <input
    //               accept="image/jpg, image/png, image/jpeg"
    //               name="petImage"
    //               type="file"
    //               onChange={this.onPetImageChange}
    //               style={{ width: "197px" }}
    //             />
    //           </div>
    //         </div>
    //         <div className="NewService">
    //           <div className="row">
    //             <label>Enter Pet Rating</label>
    //             <select
    //               onChange={this.onRatingChange}
    //               className="textfield-spacing select-width"
    //               variant="outlined"
    //               name="petRating"
    //               width="100px"
    //               displayEmpty="true"
    //               style={{
    //                 marginTop: "5px",
    //                 marginBottom: "10px",
    //                 width: "218px",
    //                 height: "42px",
    //               }}
    //             >
    //                <option value={""}>Choose Pet Rating</option>
    //               <option value={"1"}>1</option>
    //               <option value={"2"}>2</option>
    //               <option value={"3"}>3</option>
    //               <option value={"4"}>4</option>
    //               <option value={"5"}>5</option>
    //             </select>
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
    //           Add Pet
    //         </Button>
    //         <br></br>
    //         {this.state.serviceAdded ? (
    //           <Alert severity="success">Pet Added!</Alert>
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
    //       {this.state.pets.length > 0 ? (
    //       <DataGrid
    //         rows={this.state.pets.map((pet) => ({
    //           id: pet._id,
    //           // petName: pet.petName,
    //           petType: pet.petType,
    //           // petPrice: pet.petPrice,
    //           petBreed: pet.petBreed,
    //           petImage: pet.petImage,
    //           petRating: pet.petRating,
    //         }))}
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
        <form onSubmit={this.handleAddPet}>
        <h1 className="Title">Pet</h1>
          <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={2} md={2} sm={2} xs={12}>
              <InputLabel className='labelLike'>Select Pet Type <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <Select
                onChange={this.onPetTypeChange}
                className='textfield-spacing select-width'
                variant='outlined'
                name='petType'
                width='100px'
                displayEmpty='true'
                required
              >
                <InputLabel>Pet Type</InputLabel>
                <MenuItem value={"dog"}>Dog</MenuItem>
                <MenuItem value={"cat"}>Cat</MenuItem>
                <MenuItem value={"fish"}>Fish</MenuItem>
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
              <InputLabel className='labelLike'>Select Pet Breed <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <Select
                onChange={this.onBreedChange}
                className='textfield-spacing select-width'
                variant='outlined'
                name='petBreed'
                width='100px'
                displayEmpty='true'
                required
              >
                <label>Choose Pet Breed <sup><strong>*</strong></sup></label>
                <InputLabel>Pet Breed</InputLabel>
                <MenuItem value={"husky"}>Husky</MenuItem>
                <MenuItem value={"pug"}>Pug</MenuItem>
                <MenuItem value={"Pusky"}>Pusky</MenuItem>
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
              <InputLabel className='labelLike'>Upload Pet Image <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <TextField
                style={{ marginTop: "5px", marginBottom: "10px", width: "56%" }}
                accept='image/*'
                name='categoryImage'
                type='file'
                onChange={this.onPetImageChange}
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
              <InputLabel className='labelLike'>Choose Pet Rating <sup><strong>*</strong></sup></InputLabel>
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={12} sx={{textAlign:'left'}}>
              <Select
                onChange={this.onRatingChange}
                className='textfield-spacing select-width'
                variant='outlined'
                name='petRating'
                width='100px'
                displayEmpty='true'
                required
              >
                <label>Enter Pet Rating</label>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
              </Select>
            </Grid>
          </Grid>
          {/* <InputLabel className="labelLike">Select Pet Type</InputLabel>
          <Select
            onChange={this.onPetTypeChange}
            className="textfield-spacing select-width"
            variant="outlined"
            name="petType"
            width="100px"
            displayEmpty="true"
          >
            
            <MenuItem value={"dog"}>Dog</MenuItem>
            <MenuItem value={"cat"}>Cat</MenuItem>
            <MenuItem value={"fish"}>Fish</MenuItem>
          </Select> */}

          {/* <InputLabel className="labelLike">Select Pet Breed</InputLabel>
          <Select
            onChange={this.onBreedChange}
            className="textfield-spacing select-width"
            variant="outlined"
            name="petBreed"
            width="100px"
            displayEmpty="true"
          >
            <label>Choose Pet Breed</label>
            <MenuItem value={"husky"}>Husky</MenuItem>
            <MenuItem value={"pug"}>Pug</MenuItem>
            <MenuItem value={"Pusky"}>Pusky</MenuItem>
          </Select> */}
          {/* <InputLabel className="labelLike">Upload Pet Image</InputLabel>
          <TextField
            style={{ marginTop: "5px", marginBottom: "10px" }}
            accept="image/*"
            name="categoryImage"
            type="file"
            onChange={this.onPetImageChange}
          /> */}
          {/* <InputLabel className="labelLike">Choose Pet Rating</InputLabel>
          <Select
            onChange={this.onRatingChange}
            className="textfield-spacing select-width"
            variant="outlined"
            name="petRating"
            width="100px"
            displayEmpty="true"
          >
            <label>Enter Pet Rating</label>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
          </Select> */}

          <Button
            className='textfield-spacing'
            type='submit'
            variant='contained'
            color='primary'
          >
            Add Pet
          </Button>

          <br></br>
          {this.state.serviceAdded ? (
            <Alert severity='success'>Pet Added!</Alert>
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
          {this.state.pets.length > 0 ? (
            <DataGrid
              rows={this.state.pets.map((pet) => ({
                id: pet._id,
                // petName: pet.petName,
                petType: pet.petType,
                // petPrice: pet.petPrice,
                petBreed: pet.petBreed,
                petImage: pet.petImage,
                petRating: pet.petRating,
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