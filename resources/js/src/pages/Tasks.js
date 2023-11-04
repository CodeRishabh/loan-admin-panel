import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { AppOrderTimeline, AppTasks } from '../components/_dashboard/tasks'
import Page from '../components/Page'

export default function Tasks() {
    return (
        <Page title="Tasks | LoanPe">
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>
                    Tasks
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <AppTasks />
                    </Grid>
                    {/* <Grid item xs={12} md={6} lg={4}>
                        <AppOrderTimeline />
                    </Grid> */}
                </Grid>
            </Container>
        </Page>
    )
}
