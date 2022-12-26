import { useState } from "react";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

import clsx from "clsx";
import { useTranslation } from "next-i18next";

import Link from "@/components/Link";
import { PrimaryButton } from "@/components/Button";

import { capitalize } from "@/libs/helpers";
import getTypeColor from "@/libs/getTypeColor";

type PokemonTypeColor = {
  name: string;
  color: string;
};

export default function PokemonTypeNav({
  types,
  currentType,
}: {
  types: PokemonTypeColor[];
  currentType?: string | null;
}) {
  const { t } = useTranslation("common");
  const { query, pathname } = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <PrimaryButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          width: "100%",
          backgroundColor: currentType
            ? getTypeColor(currentType)
            : "neutral.main",
          display: {
            xs: "flex",
            md: "none",
          },
          "&:hover": {
            backgroundColor: currentType
              ? getTypeColor(currentType)
              : "neutral.main",
          },
        }}
      >
        {capitalize(currentType ?? t("chooseAType"))}
      </PrimaryButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: "300px",
            width: "100%",
          },
        }}
      >
        {types.map((pokeType, index) => (
          <MenuItem
            key={pokeType.name}
            onClick={handleClose}
            dense
            sx={{
              ".MuiLink-root": {
                width: "100%",
                textDecoration: "none",
                color: "gray.main",
                fontSize: 20,
                lineHeight: 1.75,
              },
            }}
          >
            <Link
              href={{
                pathname: pathname,
                query: { ...query, type: pokeType.name },
              }}
            >
              {capitalize(pokeType.name)}
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Box
        component="ul"
        sx={{
          pl: 2,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {types.map((pokeType, index) => (
          <Box
            component="li"
            key={pokeType.name}
            sx={{
              color: "gray.main",
              fontSize: 14,
              lineHeight: 1.5,
              mt: index === 0 ? 0 : 1,

              "&.active-type": {
                fontWeight: "bold",

                "&, .MuiLink-root": {
                  color: pokeType.color,
                },
              },

              ".MuiLink-root": {
                color: "gray.main",
                textDecoration: "none",
              },
            }}
            className={clsx({
              "active-type": pokeType.name === currentType,
            })}
          >
            <Link
              href={{
                pathname: pathname,
                query: { ...query, type: pokeType.name },
              }}
            >
              {capitalize(pokeType.name)}
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
}
