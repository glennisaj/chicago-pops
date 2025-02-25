import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { locations } from '../data/locations';

// Chicago-themed colors
const theme = {
  primary: '#41B6E6',    // Chicago Light Blue
  secondary: '#BE3A34',  // Chicago Red
  darkBlue: '#003366',   // Deep Blue (representing Lake Michigan)
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0'
};

function Header({ onSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = locations.filter(location => 
      location.name.toLowerCase().includes(value.toLowerCase()) ||
      location.address.toLowerCase().includes(value.toLowerCase()) ||
      location.description.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleLocationSelect = (location) => {
    setSearchTerm(location.name);
    setShowResults(false);
    if (onSearchResult) {
      onSearchResult(location);
    }
  };

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: theme.white, 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '10px 0',
      borderBottom: `3px solid ${theme.primary}`  // Chicago blue border
    }}>
      <Toolbar sx={{ flexDirection: 'column', gap: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: theme.darkBlue,
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            position: 'relative',
            '&::after': {  // Adding a decorative underline
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: theme.secondary
            }
          }}
        >
          Chicago Private Public Spots
        </Typography>
        
        <Box sx={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
          <TextField
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Chicago spaces..."
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: theme.white,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': {
                  borderColor: theme.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.primary,
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.primary }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                mt: 1,
                maxHeight: '300px',
                overflow: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <List>
                {searchResults.map((result) => (
                  <ListItem
                    key={result.id}
                    button
                    onClick={() => handleLocationSelect(result)}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.lightGray
                      }
                    }}
                  >
                    <ListItemText
                      primary={result.name}
                      secondary={result.address}
                      primaryTypographyProps={{
                        color: theme.darkBlue
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1.5, 
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '600px'
        }}>
          <FilterButton icon="🌳" label="Parks" />
          <FilterButton icon="🏢" label="Plazas" />
          <FilterButton icon="🏛️" label="Indoor" />
          <FilterButton icon="🌿" label="Other" />
          <FilterButton icon="📍" label="All" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Helper component for filter buttons
function FilterButton({ icon, label }) {
  return (
    <Box
      component="button"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 16px',
        border: `1px solid ${theme.borderGray}`,
        borderRadius: '20px',
        backgroundColor: theme.white,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.lightGray,
          borderColor: theme.primary,
          color: theme.primary
        },
        fontSize: '14px',
        color: theme.darkBlue,
        transition: 'all 0.2s',
        '&:active': {
          transform: 'scale(0.98)'
        }
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Box>
  );
}

export default Header;
