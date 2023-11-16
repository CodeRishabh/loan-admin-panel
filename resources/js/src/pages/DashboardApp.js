import React, { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// api
import { totalCount, todayCount, monthCount, approved, pendingApproval, pendingVerification, monthlyRequest, fetchAdmin, fetchRequestPage, stateRequest } from '../api';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppMonthlyRequest,
  AppTotalRequest,
  AppNewsUpdate,
  AppDownloads,
  AppOrderTimeline,
  AppRequestStats,
  AppMonthlyUsers,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [total, setTotal] = useState('')
  const [today, setToday] = useState('')
  const [month, setMonth] = useState('')
  const [approval, setApproval] = useState('')
  const [pendingApprovals, setPendingApprovals] = useState('')
  const [pendingKYC, setPendingKYC] = useState('')
  const [monthlyUsers, setMonthlyUsers] = useState('')
  const [stateUsers, setStateUsers] = useState({
    stateArr: [],
    stateData : []
  })

  useEffect(async () => {
    todayCount().then((res) => {
      setToday(res);
    });
    monthCount().then((res) => {
      setMonth(res);
    });
    totalCount().then((res) => {
      setTotal(res);
    });
    approved().then((res) => {
      setApproval(res);
    });
    pendingApproval().then((res) => {
      setPendingApprovals(res);
    });
    pendingVerification().then((res) => {
      setPendingKYC(res);
    });
    monthlyRequest().then((res) => {
      setMonthlyUsers(res);
    });
    stateRequest().then((res) => {
      setStateUsers(res);
    })
  }, []);

  return (
    <Page title="Dashboard | OneCredit">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppDownloads count={total} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalRequest count={total} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMonthlyRequest count={month} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers count={today} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppMonthlyUsers monthlyUsers={monthlyUsers} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppRequestStats
              approval={approval}
              pendingApprovals={pendingApprovals}
              pendingKYC={pendingKYC}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates stateUsers={stateUsers} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
