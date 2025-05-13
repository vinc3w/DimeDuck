import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                color: "primary",
              },
              style: {
                color: "var(--text-primary)",
              },
            },
            {
              props: {
                color: "secondary",
              },
              style: {
                color: "var(--text-secondary)",
              },
            },
          ],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                color: "primary",
              },
              style: {
                color: "var(--primary)",
              },
            },
          ],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--card)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                variant: "contained",
                color: "primary",
              },
              style: {
                color: "var(--button-text)",
                backgroundColor: "var(--primary)",
              },
            },
            {
              props: {
                variant: "outlined",
                color: "primary",
              },
              style: {
                color: "var(--primary)",
                borderColor: "var(--primary)",
              },
            },
            {
              props: {
                variant: "contained",
                color: "disabled",
              },
              style: {
                color: "var(--button-text)",
                backgroundColor: "var(--disabled)",
              },
            },
            {
              props: {
                variant: "text",
              },
              style: {
                color: "var(--primary)",
              },
            },
          ],
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                color: "primary",
              },
              style: {
                color: "var(--primary)",
              },
            },
          ],
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--primary)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "var(--primary)",
          },
        },
      },
    },
  },
});
