import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRejectedUsersRequest } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import Page from "../components/Page";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import refreshOutline from "@iconify/icons-eva/refresh-outline";

export default function RejectedUsers() {
    const [rejectionList, setRejectionList] = useState([]);

    const handleRefresh = () => {
        getRejectedUsersRequest(0).then((res) => {
            setRejectionList(res);
        });
    };

    useEffect(() => {
        getRejectedUsersRequest(0).then((res) => {
            console.log(res);
            setRejectionList(res);
        });
    }, []);

    return (
        <Page title="Rejections | OneCredit">
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Rejected Users
                    </Typography>
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleRefresh}
                            startIcon={<Icon icon={refreshOutline} />}
                        >
                            Refresh
                        </Button>
                    </div>
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        {/* <caption>A basic table example with a caption</caption> */}
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#D0D0D0" }}>
                                <TableCell style={{ width: "200px" }}>
                                    Customer Name
                                </TableCell>
                                <TableCell align="left">Phone No.</TableCell>
                                <TableCell align="left">Email ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rejectionList.map((query) => (
                                <TableRow key={query._id}>
                                    <TableCell component="th" scope="row">
                                        <strong>
                                            {query.firstName +
                                                " " +
                                                query.lastName}
                                        </strong>
                                    </TableCell>
                                    <TableCell align="left">
                                        {query.phoneNumber}
                                    </TableCell>
                                    <TableCell align="left">
                                        {query.emailID}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Page>
    );
}
