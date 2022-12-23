import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Link from "@/components/Link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRouter } from "next/router";

const LanguageSwitcherBar = styled("div")({
  background: "#F7F8F8",
});

const StyledNavLink = styled(Link)(
  ({ theme }) => `
    color: #42494d;
    position: relative;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: #ECEDED;
      position: absolute;
      bottom: -8px;
      left: 0px;
      opacity: 0;
      visibility: hidden;
    }

    &:hover,
    &.active {
      color: ${theme.palette.primary.main};
    }

    &.active {
      font-weight: bold;

      &:after {
        opacity: 1;
        visibility: visible;
      }
    }
  `
);

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <LanguageSwitcherBar>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              py: 1,
              justifyContent: "flex-end",
            }}
          >
            <LanguageSwitcher />
          </Box>
        </Container>
      </LanguageSwitcherBar>

      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={{ xs: 2, md: 5 }}
        >
          <Link href="/">
            <Image src="/logo@2x.png" alt="logo" width={167} height={60} />
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, md: 5 }}
            component="nav"
          >
            <StyledNavLink
              href="/"
              underline="none"
              className={router.pathname == "/" ? "active" : ""}
            >
              Home
            </StyledNavLink>

            <StyledNavLink
              href="/type"
              underline="none"
              className={router.pathname == "/type" ? "active" : ""}
            >
              Pokemon Type
            </StyledNavLink>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
