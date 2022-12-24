import * as React from "react";
import Button from "@mui/material/Button";
import { styled, darken } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  color: #fff;
  padding: ${theme.spacing(1, 2)};
  font-weight: bold;
  border-radius: 14px;
  padding: 10px 24px;
  text-transform: none;

  :hover {
    background: ${darken(theme.palette.primary.main, 0.2)};
  }
`
);
