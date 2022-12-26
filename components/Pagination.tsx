import MUIPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import clsx from "clsx";

declare module "@mui/material/Pagination" {
  interface PaginationProps {
    overridebgcolor?: string;
    overridetextcolor?: string;
  }
}

const StyledPagination = styled(MUIPagination)(
  ({
    theme,
    overridebgcolor = theme.palette.neutral.main,
    overridetextcolor = "#fff",
  }: {
    theme: Theme;
    overridebgcolor?: string;
    overridetextcolor?: string;
  }) => ({
    "&.custom-pagination": {
      ".MuiPagination-ul": {
        "> li + li": {
          marginLeft: "8px",
        },
      },

      ".MuiPaginationItem-ellipsis": {
        fontSize: "20px",
      },

      ".MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
        border: `3px solid`,
        borderColor: `${overridebgcolor}`,
        fontSize: "20px",
        padding: "15px",
      },
    },

    ".MuiPaginationItem-ellipsis": {
      color: `${overridebgcolor}`,
      fontWeight: "bold",
    },

    ".MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
      color: `${overridebgcolor}`,
      border: `2px solid`,
      borderColor: `${overridebgcolor}`,
      borderRadius: "8px",
      fontWeight: "bold",
      lineHeight: "20px",
      height: "auto",
      padding: "8px 12px",

      "&:hover, &.Mui-selected": {
        background: `${overridebgcolor}`,
        color: `${overridetextcolor}`,
      },
    },

    "&.dense": {
      "&.custom-pagination": {
        ".MuiPagination-ul": {
          "> li + li": {
            marginLeft: "4px",
          },
        },

        ".MuiPaginationItem-ellipsis": {
          fontSize: "12px",
        },

        ".MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
          borderWidth: "2px",
          fontSize: "12px",
          padding: "8px",
        },
      },
    },
  })
);

type PaginationProps = {
  count: number;
  page?: number;
  perPage?: number;
  classNames?: string;
  overridebgcolor?: string;
  overridetextcolor?: string;
  onPageChanged: (page: number) => void;
};

export default function Pagination({
  count,
  page = 1,
  perPage = 9,
  classNames = "",
  onPageChanged,
  overridebgcolor,
  overridetextcolor,
}: PaginationProps) {
  const theme = useTheme();
  const smallAndAbove = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledPagination
      page={page}
      variant="outlined"
      shape="rounded"
      count={count}
      overridebgcolor={overridebgcolor ?? theme.palette.neutral.main}
      overridetextcolor={overridetextcolor ?? "#fff"}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            first: KeyboardDoubleArrowLeftIcon,
            last: KeyboardDoubleArrowRightIcon,
          }}
          {...item}
        />
      )}
      showFirstButton={smallAndAbove}
      showLastButton={smallAndAbove}
      className={clsx([classNames, { "custom-pagination": smallAndAbove }])}
      onChange={(e, page) => onPageChanged(page)}
    />
  );
}
