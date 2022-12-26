import MUINativeSelect from "@mui/material/NativeSelect";
import { styled, Theme, useTheme } from "@mui/material/styles";

declare module "@mui/material/NativeSelect" {
  interface NativeSelectProps {
    overridecolor?: string;
  }
}

export const NativeSelect = styled(MUINativeSelect)(
  ({
    theme,
    overridecolor = theme.palette.neutral.main,
  }: {
    theme: Theme;
    overridecolor?: string;
  }) => ({
    color: `${overridecolor}`,

    ".MuiNativeSelect-select": {
      lineHeight: "20px",
      height: "auto",
      fontWeight: "bold",
      borderRadius: "8px",
      border: `2px solid`,
      borderColor: `${overridecolor}`,
      padding: "8px 12px",

      [theme.breakpoints.up("sm")]: {
        fontSize: "20px",
        borderWidth: `3px`,
        padding: "15px 24px 15px 15px",
      },

      "&:focus": {
        borderRadius: "8px",
        backgroundColor: "inherit",
      },
    },

    "&.dense": {
      ".MuiNativeSelect-select": {
        fontSize: "10px",
        padding: "8px 18px 8px 8px",
        borderWidth: `2px`,

        [theme.breakpoints.up("sm")]: {
          fontSize: "12px",
          borderWidth: `2px`,
          padding: "8px 18px 8px 8px",
        },
      },
    },

    ".MuiNativeSelect-icon": {
      right: "4px",
    },

    ".MuiSvgIcon-root": {
      color: `${overridecolor}`,
    },
    "&:before": {
      display: "none",
    },
    "&:after": {
      display: "none",
    },
  })
);
