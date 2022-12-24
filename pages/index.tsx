/* eslint-disable react/no-unescaped-entities */

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { PrimaryButton } from "@/components/Button";
import PokemonCard from "@/components/PokemonCard";
import { GetStaticProps } from "next";
import { getPokemons } from "@/libs/api";
import { PokemonCardItem } from "@/types/Pokemon";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const PER_PAGE = 9;

type HomeProps = {
  pokemons: PokemonCardItem[];
  count: number;
};

export default function Home({ pokemons, count }: HomeProps) {
  const { t } = useTranslation("common");

  const [selectedPokemon, setSelectedPokemon] =
    React.useState<PokemonCardItem | null>(null);
  const myRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToPokedex = () =>
    myRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleCardClicked = (pokemon: PokemonCardItem) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Stack direction="column">
              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 52,
                  },
                  fontWeight: "bold",
                  lineHeight: 1.25,
                  mb: 2,
                }}
              >
                {t("hero.heading")}
              </Typography>
              <Typography sx={{ color: "gray.main" }}>
                {t("hero.subheading")}
              </Typography>
              <PrimaryButton
                sx={{ mt: 4, alignSelf: "flex-start" }}
                onClick={scrollToPokedex}
              >
                {t("hero.button")}
              </PrimaryButton>
            </Stack>
          </Grid>
          <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                position: "relative",
                width: {
                  xs: "240px",
                  sm: "300px",
                  md: "100%",
                },
                margin: {
                  xs: "0 auto",
                  md: "0",
                },
              }}
            >
              <Image
                priority
                src="/images/hero-pokemons.png"
                alt="pokemons image"
                width={534}
                height={632}
                sizes="(max-width: 480px) 240px,
                  534px"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        id="pokedex"
        ref={myRef}
        sx={{
          backgroundColor: "primary.light",
          minHeight: "100vh",
          py: { xs: 5, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="column" spacing={2} alignItems="center" mb={5}>
            <Typography
              component="h2"
              sx={{ fontSize: 40, fontWeight: "bold" }}
            >
              {t("pokedex.heading")}
            </Typography>
            <Typography>{t("pokedex.subheading", { count })}</Typography>
          </Stack>

          <Grid container spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid xs={12} sm={6} md={4} key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  onCardClicked={() => handleCardClicked(pokemon)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let data = await getPokemons({
    limit: PER_PAGE,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      pokemons: data.pokemons,
      count: data.count,
      next: data.next,
      previous: data.previous,
    },
  };
};
