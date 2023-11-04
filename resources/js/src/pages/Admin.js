import { useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Container,
} from '@mui/material';
import Page from '../components/Page';
import AdminForm from '../components/_dashboard/admin/AdminForm';
import AdminCard from '../components/_dashboard/admin/AdminCard';

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


export default function Admin() {
    const [values, setValues] = useState({
        firstName: 'Katarina',
        lastName: 'Smith',
        email: 'demo@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Page title="Admin | LoanPe">
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>
                    Admin Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <AdminCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <AdminForm />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
