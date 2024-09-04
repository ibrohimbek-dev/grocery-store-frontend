import { createTheme } from "@mui/material/styles";
import { blue, grey, blueGrey } from "@mui/material/colors";

export const themeMode = (darkMode: boolean) => {
	return createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
			primary: {
				...(darkMode ? { main: blue[300] } : blue),
			},
			background: {
				...(darkMode
					? {
							default: blueGrey[900],
							paper: blueGrey[900],
					  }
					: {
							default: grey[50],
							paper: grey[50],
					  }),
			},
			text: {
				...(darkMode
					? {
							primary: "#fff",
							secondary: grey[500],
					  }
					: {
							primary: grey[900],
							secondary: grey[800],
					  }),
			},
		},
	});
};

// DONE!
