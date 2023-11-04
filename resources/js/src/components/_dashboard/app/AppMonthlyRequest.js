
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { BsCalendar3 } from 'react-icons/bs'
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundImage: 'linear-gradient(135deg, #ffd97b 0%,#f79b25 100%);'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: '#da391e',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.14
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppMonthlyRequest(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <BsCalendar3 size={30} />
      </IconWrapperStyle>
      <Typography variant="h3">{props.count}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Monthly Request
      </Typography>
    </RootStyle>
  );
}
