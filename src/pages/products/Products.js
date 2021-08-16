import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import Select from 'react-select'

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    dialog: {
        height: '400px'
    },
    label: {
        marginTop: '10px',
        marginBottom: '10px'

    }
}))

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Products(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openNotification, setOpenNotification] = React.useState(false);

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prod, setProd] = React.useState({
        name: "",
        desc: ""
    })
    const [prodCategory, setProdCategory] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    const [prodTags, setProdTags] = useState([])
    const [prodImage, setProdImage] = useState([])
    const handleChangeSelect = selectedOption => {
        setSelectedOption(selectedOption)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = (evt) => {
        const value = evt.target.value;
        setProd({
            ...prod,
            [evt.target.name]: value
        });
    }
    const addProduct = () => {
        const token = localStorage.getItem('token')
        const data = new FormData()
        data.append('image', prodImage)
        data.append('name', prod.name)
        data.append('desc', prod.desc)
        data.append('Categories', JSON.stringify(selectedOption))
        let axiosConfig = {
            headers: {
                'token': token,
            }
        };
        axios.post(`${process.env.REACT_APP_AUTH_SERVER}/products/create-product`, data, axiosConfig)
            .then((response) => {
                if (response.status = 200) {
                    setOpen(false)
                    setOpenNotification(true)
                    getProductsData(token)
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleFileChange = (event) => {
        setProdImage(event.target.files[0])
    }

    const getProductsData = async (token) => {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/products/fetch-all-products`, {
                headers: {
                    'token': token
                }
            });
            console.log(resp.data);
            const data = resp.data
            setData(data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const getCategories = async (token) => {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/category/fetch-all-categories`, {
                headers: {
                    'token': token
                }
            });
            console.log(resp.data);
            const data = resp.data
            const arr = []
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                arr.push({
                    label: element.categoryName,
                    value: element._id
                })
            }
            setCategories(arr)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotification(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('token')
        getCategories(token)
        getProductsData(token)
    }, []);
    useEffect(() => {
        console.log({ prodImage })
    }, [prodImage]);
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "desc",
            label: "Description",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Categories",
            label: "Categories",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
    console.log({ selectedOption })
    return (
        <div>
            <PageTitle title="Products" />
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Button onClick={handleClickOpen} variant="contained" color="primary">
                    Create Product
                </Button>
            </Grid>
            <br />
            <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity="success">
                    Product Added Successfully
                </Alert>
            </Snackbar>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Products"
                        data={data}
                        columns={columns}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </Grid>
                <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            name='name'
                            value={prod.name}
                            margin="dense"
                            id="productname"
                            label="Product Name"
                            onChange={handleChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            name='desc'
                            value={prod.desc}
                            margin="dense"
                            id="productdesc"
                            label="Product Description"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <InputLabel className={classes.label}>Select Categories</InputLabel>
                        <Select isMulti onChange={handleChangeSelect} options={categories} />
                        <InputLabel className={classes.label}>Tags</InputLabel>
                        <Select isMulti options={options} />
                        <InputLabel className={classes.label}>Select Image</InputLabel>

                        <input type="file" name="image" onChange={handleFileChange} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addProduct} color="primary">
                            Create Product
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </div>
    );
}

export default Products;
