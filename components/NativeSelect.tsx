import MUINativeSelect from "@mui/material/NativeSelect";
import { styled, useTheme } from "@mui/material/styles";

export const NativeSelect = styled(MUINativeSelect)(({ theme }) => ({
  color: "#fff",

  ".MuiNativeSelect-select": {
    lineHeight: "20px",
    height: "auto",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "2px solid #fff",
    padding: "8px 12px",

    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
      border: "3px solid #fff",
      padding: "15px 24px 15px 15px",
    },

    "&:focus": {
      borderRadius: "8px",
      backgroundColor: "inherit",
    },
  },

  ".MuiNativeSelect-icon": {
    right: "4px",
  },

  ".MuiSvgIcon-root": {
    color: "#fff",
  },
  "&:before": {
    display: "none",
  },
  "&:after": {
    display: "none",
  },
}));
