import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "../Css/Loading.css";

function Loading() {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const circularProgressStyle = {
    color: '#699bfe', 
  };

  return (
    <div id='loading'>
      <Stack spacing={2} direction="row">
        <CircularProgress variant="determinate" value={progress} style={circularProgressStyle}/>
      </Stack>
    </div>

  );
}

export default Loading;
