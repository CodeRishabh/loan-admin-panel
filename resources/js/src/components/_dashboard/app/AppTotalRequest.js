// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { RiFilePaper2Fill } from 'react-icons/ri'
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.dark,
  backgroundImage: 'linear-gradient(135deg, #e4cafc 0%,#7367f0 100%);'
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
  color: '#7367f0',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.14
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppTotalRequest(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
      <RiFilePaper2Fill size={35} />
      </IconWrapperStyle>
      <Typography variant="h3">{props.count}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Request
      </Typography>
    </RootStyle>
  );
}
