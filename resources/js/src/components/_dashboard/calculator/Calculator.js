import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
    Box,
    Card,
    Checkbox,
    CardHeader,
    Typography,
    FormControlLabel,
    Stack,
    Grid,
    TextField,
    Button
} from '@mui/material';
import CalculatorPie from './CalculatorPie';
import { grid } from '@mui/system';

// ----------------------------------------------------------------------

const TASKS = [
    'Create FireStone Logo',
    'Add SCSS and JS files if required',
    'Stakeholder Meeting',
    'Scoping & Estimations',
    'Sprint Showcase'
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
    task: PropTypes.string,
    checked: PropTypes.bool,
    formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
    const { getFieldProps } = formik;

    return (
        <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
            <FormControlLabel
                control={
                    <Checkbox {...getFieldProps('checked')} value={task} checked={checked} {...other} />
                }
                label={
                    <Typography
                        variant="body2"
                        sx={{
                            ...(checked && {
                                color: 'text.disabled',
                                textDecoration: 'line-through'
                            })
                        }}
                    >
                        {task}
                    </Typography>
                }
            />
        </Stack>
    );
}

export default function InputForm() {
    const formik = useFormik({
        initialValues: {
            principal: 50000,
            tenure: 10,
            rate: 7.5
        },
        onSubmit: values => {
            var monthlyInterestRatio = (values.rate / 100) / 12;
            var top = Math.pow((1 + monthlyInterestRatio), values.tenure);
            var bottom = top - 1;
            var sp = top / bottom;
            var Emi = ((values.principal * monthlyInterestRatio) * sp).toFixed(0);
            var full = values.tenure * Emi;
            var Interest = full - values.principal;
            var int_pge = ((Interest / full) * 100).toFixed(2);
            setAmount(values.principal + Interest)
            setEmi(Emi)
            setTotInterest(Interest)
            setIntPge(int_pge)
        },
    });

    const { values, handleSubmit } = formik;

    const [amount, setAmount] = useState(51730)
    const [totInterest, setTotInterest] = useState(1730)
    const [emi, setEmi] = useState(5173)
    const [intPge, setIntPge] = useState(3.34)

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <Card>
                        <Box sx={{ px: 3, py: 1 }}>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Grid m={2}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            label="Total Amount"
                                            id="principal"
                                            name="principal"
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.principal}
                                        />
                                    </Grid>
                                    <Grid m={2}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            label="Time in Months"
                                            id="tenure"
                                            name="tenure"
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.tenure}
                                        />
                                    </Grid>
                                    <Grid m={2}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            required
                                            label="Interest Rate in %"
                                            id="rate"
                                            name="rate"
                                            type="number"
                                            onChange={formik.handleChange}
                                            value={formik.values.rate}
                                        />
                                    </Grid>
                                    <Grid m={2}>
                                        <Button color="primary" variant="contained" fullWidth type="submit">
                                            Calculate
                                        </Button>
                                    </Grid>
                                </Form>
                            </FormikProvider>
                        </Box>
                    </Card>
                    <br />
                    <Card style={{ backgroundColor: '#5BE584' }}>
                        <Typography variant="h5" gutterBottom ml={5} mt={2}>
                            Monthly EMI: {emi}
                        </Typography>
                        <Typography variant="h5" gutterBottom ml={5}>
                            Total Interest : {totInterest}
                        </Typography>
                        <Typography variant="h5" gutterBottom ml={5}>
                            Payable Amount : {amount}
                        </Typography>
                        {/* <Typography variant="h5" gutterBottom ml={5}>
                            Interest Percentage : {intPge}%
                        </Typography> */}
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CalculatorPie
                            emi={emi}
                            interest={totInterest}
                            amount={amount}
                            principal={formik.values.principal}
                            intPge={intPge}
                        />
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}
