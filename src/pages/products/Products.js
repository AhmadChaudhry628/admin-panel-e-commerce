import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';

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
function Products(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Products"
                        data={datatableData}
                        columns={["Name", "Description", "Categories", "Image", {
                            label: "Actions",
                            options: {
                                customBodyRender: (value, tableMeta, updateValue) => {
                                    return (
                                        <Button variant="contained" color="primary" onClick={() => console.log(value, tableMeta)}>
                                            Edit
                                        </Button>
                                    )
                                }
                            }
                        }]}
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
                            margin="dense"
                            id="productname"
                            label="Product Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="productdesc"
                            label="Product Description"
                            type="text"
                            fullWidth
                        />
                        <InputLabel className={classes.label}>Select Categories</InputLabel>
                        <Select isMulti options={options} />
                        <InputLabel className={classes.label}>Tags</InputLabel>
                        <Select isMulti options={options} />
                        <InputLabel className={classes.label}>Select Image</InputLabel>

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Create Product
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </div>
    );
}

export default Products;
