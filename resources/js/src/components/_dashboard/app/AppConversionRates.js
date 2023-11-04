import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


export default function AppConversionRates(props) {
  const CHART_DATA = [{ data: props.stateUsers.stateData }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: props.stateUsers.stateArr
    }
  });

  return (
    <div>
      {
        props.stateUsers &&
        <>
          {
            props.stateUsers.stateData.length > 0 &&
            <>
              <Card>
                <CardHeader title="Users By State" />
                <Box sx={{ mx: 3 }} dir="ltr">
                  <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
                </Box>
              </Card>
            </>
          }
        </>
      }
    </div>

  );
}
