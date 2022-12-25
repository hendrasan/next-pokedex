import MUIPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import clsx from "clsx";

const StyledPagination = styled(MUIPagination)(({ theme }) => ({
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
      border: "3px solid #fff",
      fontSize: "20px",
      padding: "15px",
    },
  },

  ".MuiPaginationItem-ellipsis": {
    color: "#fff",
    fontWeight: "bold",
  },

  ".MuiPaginationItem-root:not(.MuiPaginationItem-ellipsis)": {
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "8px",
    fontWeight: "bold",
    lineHeight: "20px",
    height: "auto",
    padding: "8px 12px",

    "&:hover, &.Mui-selected": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  },
}));

type PaginationProps = {
  count: number;
  page?: number;
  perPage?: number;
  onPageChanged: (page: number) => void;
};

export default function Pagination({
  count,
  page = 1,
  perPage = 9,
  onPageChanged,
}: PaginationProps) {
  const theme = useTheme();
  const smallAndAbove = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledPagination
      variant="outlined"
      shape="rounded"
      count={count}
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
      className={clsx({ "custom-pagination": smallAndAbove })}
      onChange={(e, page) => onPageChanged(page)}
    />
  );
}
