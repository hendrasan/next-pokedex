import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

const PopoverButton = styled(Button)(
  ({ theme }) => `
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.palette.gray.main};
    padding-top: 0;
    padding-bottom: 0;
    font-family: ${theme.typography.overline.fontFamily};
    font-size: ${theme.typography.overline.fontSize};
`
);

const locales: { [key: string]: string } = {
  en: "English",
  id: "Indonesia",
};

export default function LanguageSwitcher() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    router.push(router.asPath, undefined, { locale: lang });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "language-switcher-popover" : undefined;

  return (
    <>
      <PopoverButton
        startIcon={<LanguageIcon style={{ fontSize: "14px" }} />}
        endIcon={<ExpandMoreIcon style={{ fontSize: "12px" }} />}
        onClick={handleClick}
      >
        {locales[router.locale ?? "en"]}
      </PopoverButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton dense={true} onClick={() => changeLanguage("en")}>
                <ListItemText primary="English" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton dense={true} onClick={() => changeLanguage("id")}>
                <ListItemText primary="Indonesia" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Popover>
    </>
  );
}
