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
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'btnActive' },
          style: {
            backgroundColor: '#00CD9B',
            color: '#FFFFFF',
            fontWeight: "bold"
          },
        },
        {
          props: { variant: 'btnDisabled' },
          style: {
            backgroundColor: '#EAEAEA',
            color: '#CCCCCC',
            fontWeight: "bold"
          },
        },
        {
          props: { variant: 'btnInit' },
          style: {
            backgroundColor: '#FFFFFF',
            color: '#111111',
            fontWeight: "bold",
            border: "1px solid #EEEEEE"
          },
        },
      ]
    }
  }
});

export default theme;
