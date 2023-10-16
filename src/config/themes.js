import red from '@mui/material/colors/red'
import green from '@mui/material/colors/green'
import pink from '@mui/material/colors/pink'
import deepPurple from "@mui/material/colors/deepPurple"

const themes = [
  {
    id: 'default',
    color: deepPurple[500],
    source: {
      palette: {
        primary: {
          main: "#6504b5",
        },
        secondary: {
          main: "#4169E1",
        },
        error: red,
      },
    },
  },
  {
    id: 'red',
    color: red[500],
    source: {
      palette: {
        primary: red,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'green',
    color: green[500],
    source: {
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
]

export default themes
