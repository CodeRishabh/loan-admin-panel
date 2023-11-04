import { Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         overflow: 'hidden',
//         color: "white",
//     },
//     image: {
//         height: '200px',
//     },
//     imageR: {
//         height: '500px',
//     }
// }));

export default function DetailView(props) {
    // const classes = useStyles();

    const detailview = JSON.parse(sessionStorage.getItem("detailview"));
    const self = 'data:image/jpeg;base64,' + props.details.passportPhoto;
    const passbook = 'data:image/jpeg;base64,' + props.details.passbookPhoto;
    const adhaar = 'data:image/jpeg;base64,' + props.details.adharPhoto;
    const pan = 'data:image/jpeg;base64,' + props.details.panPhoto;
    const recipt = 'data:image/jpeg;base64,' + props.details.transaction.image;

    const renderTransaction = () => {
        if (props.details.transaction === null) {
            return [
                <Grid className="my-5 pb-5">
                    <h4 className="text-center"><strong>Waiting...</strong></h4>
                </Grid>
            ]
        } else {
            return [
                <>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={4}>Phone Number : {props.details.transaction.phoneNumber}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={4}>Transaction Number :  {props.details.transaction.transactionNumber}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={5}>Recipt: <br /> <img src={'data:image/jpeg;base64,' + props.details.transaction.image} alt="photoID" /></Grid>
                    </Grid>
                </>
            ]
        }
    }

    return (
        <div>
            <Container>
                <Typography className="text-center mt-3">Applied On {props.details.date.slice(0, 10)} at {props.details.date.slice(11, 19)} GMT+0530 (India Standard Time) </Typography>
                <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                    <h4 className="text-center"><strong>Personal Details</strong></h4>
                    <hr />
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Name : {props.details.firstName + " " + props.details.lastName}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Address : {props.details.address}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Pin Code : {props.details.pincode}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={6}>Phone Number : {props.details.phoneNumber}</Grid>
                        {/* <Grid item xs={6}>Email : {props.details.emailID}</Grid> */}
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Gender : {props.details.sex}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Employment Status: {props.details.employmentStatus}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        {/* <Grid item xs={6}>Occupation: {props.details.occupation}</Grid> */}
                        <Grid item xs={6}>Income Per Annum: {props.details.income}</Grid>
                    </Grid>
                </Paper>
                <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                    <h4 className="text-center"><strong>Guardian Details</strong></h4>
                    <hr />
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={12}>Father Name : {props.details.fatherName}</Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={6}>Father Occupation : {props.details.fatherOccupation}</Grid>
                        <Grid item xs={6}>Father Income : {props.details.fatherIncome}</Grid>
                    </Grid>
                </Paper>
                <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                    <h4 className="text-center"><strong>Loan Details</strong></h4>
                    <hr />
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={6}>Loan Amount : {props.details.choice.amount}</Grid>
                        <Grid item xs={6}>Tenure Period : {props.details.choice.tenurePeriod}</Grid>
                    </Grid>
                </Paper>
                <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                    <h4 className="text-center"><strong>Bank Details</strong></h4>
                    <hr />
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={4}>Account Name : {props.details.bankDetails.bankAccountName}</Grid>
                        <Grid item xs={4}>Account Number : {props.details.bankDetails.bankAccountNumber}</Grid>
                        <Grid item xs={4}>IFSC Number : {props.details.bankDetails.bankIFSC}</Grid>
                    </Grid>
                </Paper>
                {props.details.automobile &&
                    <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                        <h4 className="text-center"><strong>Automobile Loan</strong></h4>
                        <hr />
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={6}>Loan Amount : {props.details.automobile.amount}</Grid>
                            <Grid item xs={6}>Tenure Period : {props.details.automobile.tenurePeriod}</Grid>
                        </Grid>
                    </Paper>
                }
                {props.details.home &&
                    <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                        <h4 className="text-center"><strong>Home Loan</strong></h4>
                        <hr />
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={6}>Loan Amount : {props.details.home.amount}</Grid>
                            <Grid item xs={6}>Tenure Period : {props.details.home.tenurePeriod}</Grid>
                        </Grid>
                    </Paper>
                }
                {props.details.gold &&
                    <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                        <h4 className="text-center"><strong>Gold Loan</strong></h4>
                        <hr />
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={6}>Loan Amount : {props.details.gold.amount}</Grid>
                            <Grid item xs={6}>Tenure Period : {props.details.gold.tenurePeriod}</Grid>
                        </Grid>
                    </Paper>
                }
                {props.details.education &&
                    <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                        <h4 className="text-center"><strong>Education Loan</strong></h4>
                        <hr />
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={6}>Loan Amount : {props.details.education.amount}</Grid>
                            <Grid item xs={6}>Tenure Period : {props.details.education.tenurePeriod}</Grid>
                        </Grid>
                    </Paper>
                }
                <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                    <h4 className="text-center"><strong>ID's</strong></h4>
                    <hr />
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={5}>Photo ID: <br /> <img src={props.details.passportPhoto} alt="photoID" /></Grid>
                        <Grid item xs={7}>Passbook Photo: <br /> <img src={props.details.passbookPhoto} alt="passbook" /></Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 py-2">
                        <Grid item xs={6}>Adhaar Photo: <br /> <img src={props.details.adharPhotoFront} alt="adharID" /></Grid>
                        <Grid item xs={6}>Pan Photo: <br /> <img src={props.details.panPhoto} alt="panID" /></Grid>
                    </Grid>
                    <Grid container className="mr-3 px-5 pb-4">
                        <Grid item xs={6}>Adhaar Card Number: {props.details.adhaarCardNumber}</Grid>
                        <Grid item xs={6}>Pan Card Number: {props.details.panCardNumber}</Grid>

                    </Grid>
                </Paper>
                {props.details.transaction &&
                    <Paper className="my-5" style={{ backgroundColor: '#00AB55' }}>
                        <h4 className="text-center"><strong>Transaction Status</strong></h4>
                        <hr />
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={4}>Phone Number : {props.details.transaction.phoneNumber}</Grid>
                        </Grid>
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={4}>Transaction Number :  {props.details.transaction.transactionNumber}</Grid>
                        </Grid>
                        <Grid container className="mr-3 px-5 py-2">
                            <Grid item xs={5}>Recipt: <br /> <img src={recipt} alt="photoID" /></Grid>
                        </Grid>
                    </Paper>
                }
            </Container>
        </div >
    )
}
