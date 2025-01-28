import React from 'react';
import { TextField, Grid2 as Grid } from '@mui/material';

const FilterForm = ({ filters, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "20px", marginLeft: "20px" }}>
      <Grid item xs={3}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={filters.firstName}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={filters.lastName}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phoneNumber"
          value={filters.phoneNumber}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </Grid>
    </Grid>
  );
};

export default FilterForm;
