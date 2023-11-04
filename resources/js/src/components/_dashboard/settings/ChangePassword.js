import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Snackbar,
    TextField,
} from '@mui/material';
import { adminUpdateAuth } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangePassword() {

    const [open, setOpen] = useState(false);
    const { adminDetails } = useSelector((state) => state.adminReducers);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [errorMsg, setErrorMsg] = useState('')
    const [loginData, setData] = useState({
        user: '',
        password: '',
        confirmPassword: '',
    })

    const [adminData, setAdminData] = useState({
        id: "",
        bankAccountname: "",
        bankAccountNumber: "",
        bankIFSCCode: "",
        emailId: "",
        logo: ""
    })

    useEffect(() => {
        if (adminDetails.length > 0) {
            const { _id, bankAccountNumber, bankAccountname, bankIFSCCode, emailId, logo } = adminDetails[0]
            setAdminData({ ...adminData, id: _id, bankAccountNumber: bankAccountNumber, bankAccountname: bankAccountname, bankIFSCCode: bankIFSCCode, emailId: emailId, logo: logo })
        }
    }, [adminDetails])

    const validatePassword = (e) => {
        setData({ ...loginData, confirmPassword: e.target.value })
        if (loginData.password != e.target.value) {
            setErrorMsg('Password did not match')
        } else {
            setErrorMsg('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (loginData.user == '' || loginData.password == '' || loginData.confirmPassword == '') {
            alert('Please enter all field')
            handleClick()
        } else if (loginData.password != loginData.confirmPassword) {
            alert('Recheck your confirm password')
        } else {
            adminUpdateAuth(adminData.id, loginData).then((res) => {
                handleClick()
            })
        }
    }

    return (
        <div>
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            // {...props}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="User Id"
                                    name="userId"
                                    value={loginData.user}
                                    type="text"
                                    onChange={(e) => setData({ ...loginData, user: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid
                                item
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    required
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setData({ ...loginData, password: e.target.value })}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid
                                item
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    required
                                    helperText={errorMsg}
                                    type="password"
                                    value={loginData.confirmPassword}
                                    onChange={(e) => validatePassword(e)}
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
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
                            type='submit'
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Password Updated
                </Alert>
            </Snackbar>
        </div>
    )
}
