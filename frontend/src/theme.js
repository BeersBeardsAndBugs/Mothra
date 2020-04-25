import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Material Theme Settings
 * 
 * See: https://material-ui.com/customization/default-theme/
 */
const theme = createMuiTheme({
    
    // Adjust color palette here
    palette: {
        primary: {
          main: '#388e3c',
          light: '#6abf69',
          dark: '#00600f',
          contrastText: '#fafafa'
        },

        // Attributes not specified will automatically be calculated by Material
        secondary: {
          main: '#66bb6a',
        },



        // More color settings
        contrastThreshold: 2,
        tonalOffset: 0.2,
      },

      // Adjust Font size and appearence here
      typography: {

        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeightLight: 600,
        fontWeightRegular: 700,
        fontWeightMedium: 800,
        fontWeightBold: 900,
      }
});

export default theme;