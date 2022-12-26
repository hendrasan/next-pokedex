import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

import Link, { PrimaryLink } from "@/components/Link";
import Chip from "@/components/Chip";

import { capitalize } from "@/libs/helpers";

import { useTranslation } from "next-i18next";

import {
  Ability,
  Type,
  PokemonCardAndModal,
  PokemonDetail,
} from "@/types/Pokemon";

type PokemonInfoProps = {
  pokemon: PokemonCardAndModal | PokemonDetail;
  isInModal?: boolean;
};

export default function PokemonInfo({
  pokemon,
  isInModal = false,
}: PokemonInfoProps) {
  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flex: "0 0 auto",
          width: {
            xs: "240px",
            sm: "300px",
            md: "400px",
          },
        }}
      >
        <Image
          src={pokemon.sprite}
          alt={pokemon.name + " sprite"}
          width={400}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box sx={{ flex: "1 1 auto", width: "100%" }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: {
              xs: 24,
              md: 32,
              lg: 40,
            },
            fontWeight: "bold",
            mb: 3,
          }}
        >
          {pokemon.formattedName}
        </Typography>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            ".MuiTypography-root": {
              fontSize: {
                xs: 16,
                md: 20,
              },
            },
          }}
        >
          <Grid container>
            <Grid xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Weight:</Typography>
            </Grid>
            <Grid xs={6} md={3}>
              <Typography>{pokemon.weight}</Typography>
            </Grid>
            <Grid xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Height:</Typography>
            </Grid>
            <Grid xs={6} md={3}>
              <Typography>{pokemon.height}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Abilities:</Typography>
            </Grid>
            <Grid xs={6}>
              <Box
                component="ul"
                sx={{ margin: 0, "li:not(:last-child)": { mb: 1 } }}
              >
                {pokemon.abilities.map(({ ability }: Ability) => (
                  <Typography component="li" key={ability.name}>
                    {capitalize(ability.name)} {ability.is_hidden && "(hidden)"}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid xs={6} md={3}>
              <Typography sx={{ fontWeight: "bold" }}>Type:</Typography>
            </Grid>
            <Grid xs={6}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  ".MuiLink-root": {
                    textDecoration: "none",
                  },
                  ".MuiChip-root": {
                    cursor: "inherit",
                  },
                }}
              >
                {pokemon.types.map(({ type }: Type) => (
                  <Link key={type.name} href={`/type?type=${type.name}`}>
                    <Chip type={type.name} />
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {isInModal && (
            <PrimaryLink
              sx={{ mt: 4, alignSelf: "flex-start" }}
              href={`/pokemon/${pokemon.id}`}
            >
              {t("button.moreDetail")}
            </PrimaryLink>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
