import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00CD98"
    },
    btnSearch: {
      main: grey[900]
    }
  }
});

export default theme;
