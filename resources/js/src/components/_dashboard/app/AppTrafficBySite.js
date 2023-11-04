import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import googleAds from '@iconify/icons-logos/google-ads';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import logoGooglePlaystore from '@iconify/icons-ion/logo-google-playstore';
import emailOutline from '@iconify/icons-eva/email-outline';
import homeOutline from '@iconify/icons-eva/home-outline';

// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Home',
    link: '/',
    icon: <Icon icon={homeOutline} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Hostinger Mail',
    link: 'https://mail.hostinger.com/',
    icon: <Icon icon={emailOutline} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Google Play Store',
    link: 'https://play.google.com/store',
    icon: <Icon icon={logoGooglePlaystore} color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google Ads',
    link: 'https://ads.google.com/intl/en_in/home/',
    icon: <Icon icon={googleAds} color="#DF3E30" width={32} height={32} />
  },
];

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { icon, link, name } = site;

  return (
    <Grid item xs={6}>
      <a href={link} target="_blank" style={{textDecoration: 'none'}}>
        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
          <Box sx={{ mb: 0.5 }}>{icon}</Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {name}
          </Typography>
        </Paper>
      </a>
    </Grid>
  );
}

export default function AppTrafficBySite() {
  return (
    <Card>
      <CardHeader title="Quick Links" />
      <CardContent>
        <Grid container spacing={2}>
          {SOCIALS.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
