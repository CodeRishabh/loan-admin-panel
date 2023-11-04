import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@mui/material';
import { fetchAdmin, postAdmin, updateAdmin } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { onUpdateAdmin } from '../../../store/actions/index';

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    }
];


export default function AdminForm() {
    const [adminData, setData] = useState({
        id: "",
        bankAccountname: "",
        bankAccountNumber: "",
        bankIFSCCode: "",
        emailId: "",
        logo: "",
    })
    const { adminDetails } = useSelector((state) => state.adminReducers);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(adminData)
    }
    useEffect(() => {
        if (adminDetails.length > 0) {
            const { _id, bankAccountNumber, bankAccountname, bankIFSCCode, emailId, logo } = adminDetails[0]
            setData({ ...adminData, id: _id, bankAccountNumber: bankAccountNumber, bankAccountname: bankAccountname, bankIFSCCode: bankIFSCCode, emailId: emailId, logo: logo })
        }
    }, [adminDetails])

    const handleSave = () => {
        postAdmin(adminData).then((res) => {
            dispatch(onUpdateAdmin(res));
        })
    }

    const handleUpdate = () => {
        updateAdmin(adminData.id, adminData).then((res) => {
            dispatch(onUpdateAdmin(res));
            window.location.reload()
        })
    }

    const renderButton = () => {
        if (adminData.bankAccountNumber !== '') {
            return [
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleUpdate}
                    >
                        Update details
                    </Button>
                </Box>
            ]

        } else {
            return [
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleSave}
                    >
                        Save details
                    </Button>
                </Box>
            ]

        }
    }


    return (

        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        // {...props}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Account Number"
                                name="accountNumber"
                                onChange={(e) => setData({ ...adminData, bankAccountNumber: e.target.value })}
                                required
                                value={adminData.bankAccountNumber}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Account Name"
                                name="accountName"
                                onChange={(e) => setData({ ...adminData, bankAccountname: e.target.value })}
                                required
                                value={adminData.bankAccountname}
                                variant="filled"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="emailId"
                                onChange={(e) => setData({ ...adminData, emailId: e.target.value })}
                                required
                                value={adminData.emailId}
                                variant="filled"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="IFSC Code"
                                name="IFSCCode"
                                onChange={(e) => setData({ ...adminData, bankIFSCCode: e.target.value })}
                                value={adminData.bankIFSCCode}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                {renderButton()}
            </Card>
        </form>
    );
}
