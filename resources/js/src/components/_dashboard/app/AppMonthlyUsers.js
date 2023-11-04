import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
// ----------------------------------------------------------------------

export default function AppMonthlyUsers(props) {

  const [options, setOptions] = useState({
    xaxis: {
      categories: ['Nov-21', 'Dec-21', 'Jan-22']
    }
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [1, 1, 1]
    }
  ])

  useEffect(() => {
    setOptions({
      xaxis: {
        categories: props.monthlyUsers.resMonth
      }
    })
    setSeries([{
      name: "series-1",
      data: props.monthlyUsers.resData
    }])
  }, [props.monthlyUsers])

  return (
    <Card>
      <CardHeader
        title="Monthly Request"
        //subheader="(+43%) than last year"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={series}
          options={options}
          height={364}
        />
      </Box>
    </Card>
  );
}
