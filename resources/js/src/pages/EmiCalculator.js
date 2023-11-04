import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Calculator } from '../components/_dashboard/calculator'
import Page from '../components/Page'

export default function EmiCalculator() {
    return (
        <Page title="EMI Calculator | LoanPe">
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>
                    EMI Calculator
                </Typography>
                <Calculator />
            </Container>
        </Page>
    )
}
