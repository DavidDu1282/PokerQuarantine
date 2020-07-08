/* Global theme for material ui */

import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import pink from "@material-ui/core/colors/pink";

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: pink,
    background: {
      default: "#4B4B4B"
    }
  }
});

export { Theme };
