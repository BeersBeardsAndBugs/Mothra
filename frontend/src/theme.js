import { createMuiTheme } from "@material-ui/core/styles";
/**
 * Material Theme Settings
 * 
 * See: https://material-ui.com/customization/default-theme/
 * 30 Great theme examples: https://saruwakakun.com/en/material-color
 */

const defaultTheme = createMuiTheme();


const theme = createMuiTheme({
    
    // All colors in App will be determined here
    palette: {
        type: 'light',
        primary: {
           main: '#4CAF50',
          // main: '#2196F3',
          //main: '#607D8B',
          contrastText: '#fff',
        },
        secondary: {
           main: '#FFC107',
          // main: '#EF5350',
          //main: '#FDD835',
          contrastText: '#000000',
        },
        action: {
          disabledBackground: 'rgba(76, 175, 80, 0.4)', // Should be a lighter version of primary or secondary (whichever buttons use)
        },
        // Use RGBA since Hex code can't understand opacity
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.54)',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        info : {
          main: '#2196f3',
        },
        error: {
          main: '#f44336',
        },
        warning: {
          main: '#ff9800',
        },
        success: {
          main: '#4caf50',
        },
        background: {
          default: '#fafafa',
          paper: '#fff',
        },


        // More color settings
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },

      // Adjust Font size and appearence here
      typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeightLight: 600,
        fontWeightRegular: 700,
        fontWeightMedium: 800,
        fontWeightBold: 900,
      },

      // Affects look of input fields, buttons, card shapes, etc.
      shape: {
        borderRadius: 0,
      }


});

export default theme;