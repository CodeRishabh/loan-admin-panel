import { Box, Button, Card, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function AdminDetails() {
    const [result, setResult] = useState();

    const handleSubmit = () => {
        alert("Details updated. Refresh your webpage.");
    }
    const data = {
        AccountNo: 1234567890,
        IFSCNo: "12345TREWQ",
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
                <Card>
                    <Box>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid m={2}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    label="Account No."
                                    id="accountNo"
                                    name="accountNumber"
                                    type="number"
                                />
                            </Grid>
                            <Grid m={2}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    label="IFSC Number"
                                    id="ifsc"
                                    name="ifsc"
                                    type="number"
                                />
                            </Grid>
                            <Grid m={2}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    label="UPID number"
                                    id="upid"
                                    name="upid"
                                    type="email"
                                />
                            </Grid>
                            <Grid m={2}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    label="Calling number"
                                    id="callNo"
                                    name="callNumber"
                                    type="number"
                                />
                            </Grid>
                            <Grid m={2}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    required
                                    label="Whatsapp Number"
                                    id="whatsappNo"
                                    name="whatsappNo"
                                    type="number"
                                />
                            </Grid>

                            <Grid m={2}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                >
                                    Update Details
                                </Button>
                            </Grid>
                        </Form>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Card>
                    <Box m={4}>
                        <h4>Current details</h4>
                        <h6 className=" mt-2">Account Number</h6>
                        <span>{data.AccountNo}</span>
                        <h6 className=" mt-2">IFSC Number</h6>
                        <span>{data.AccountNo}</span>
                        <h6 className=" mt-2">UPID Number</h6>
                        <span>{data.AccountNo}</span>
                        <h6 className=" mt-2">Calling Number</h6>
                        <span>{data.AccountNo}</span>
                        <h6 className=" mt-2">Whatsapp Number</h6>
                        <span>{data.AccountNo}</span>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
