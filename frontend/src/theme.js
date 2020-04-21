import { createMuiTheme, withTheme } from "@material-ui/core/styles";
import {white } from "@material-ui/core/colors/";

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
        htmlFontSize: "1.2rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontSize: "1.2rem",
        fontWeightLight: 500,
        fontWeightRegular: 600,
        fontWeightMedium: 700,
        fontWeightBold: 900,

        h1: {
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },
        body1: {
            fontSize: "1.3rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em"
          },
        body2: {
            fontSize: "1.2rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em"
          }
      }
});

export default theme;