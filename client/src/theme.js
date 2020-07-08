/* Global theme for material ui */

import { createMuiTheme } from "@material-ui/core/styles";
import { teal, pink } from "@material-ui/core/colors";



const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: teal,
    secondary: pink,
    background: {
      default: "#4B4B4B"
    }
  }
});


export { Theme };
