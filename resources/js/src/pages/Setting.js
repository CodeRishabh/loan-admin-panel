import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Page from '../components/Page'
import ChangePassword from '../components/_dashboard/settings/ChangePassword'

export default function Setting() {
    return (
        <Page title="Change Password | LoanPe">
            <Container>
                <Typography variant="h4" gutterBottom>
                    Edit Credentials
                </Typography>
                <Grid>
                    <ChangePassword />
                </Grid>
            </Container>
        </Page>
    )
}
