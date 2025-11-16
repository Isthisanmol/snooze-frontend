import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total products</Typography>
            <Typography variant="h5">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Low stock</Typography>
            <Typography variant="h5">--</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Alerts</Typography>
            <Typography variant="h5">--</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6">Quick Actions</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <Button variant="outlined" href="/products">Manage Products</Button>
          <Button variant="outlined">Export CSV</Button>
        </Box>
      </Paper>
    </Box>
  );
}
