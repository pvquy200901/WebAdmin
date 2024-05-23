import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
function LoadingIndicator({ isLoading }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isLoading && <CircularProgress />}
    </Box>
  );
}

export default LoadingIndicator;
