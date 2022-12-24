import * as React from "react";
import Button from "@mui/material/Button";
import { styled, darken } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  color: #fff;
  padding: ${theme.spacing(1, 2)};

  :hover {
    background: ${darken(theme.palette.primary.main, 0.2)};
  }
`
);
