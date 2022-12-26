/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";

import { GetStaticProps } from "next";
import Image from "next/image";

import { PrimaryButton } from "@/components/Button";
import PokemonCard from "@/components/PokemonCard";
import PokemonDetailModal from "@/components/PokemonDetailModal";
import Pagination from "@/components/Pagination";
import { NativeSelect } from "@/components/NativeSelect";

import { getPokemons } from "@/libs/api";
import { PokemonCardAndModal } from "@/types/Pokemon";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const PER_PAGE = 9;

type HomeProps = {
  initialPokemons: PokemonCardAndModal[];
  count: number;
};

export default function Home({ initialPokemons, count }: HomeProps) {
  const { t } = useTranslation("common");
  const theme = useTheme();

  const [pokemons, setPokemons] = useState(initialPokemons);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE);
  const totalPage = Math.ceil(count / perPage);

  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonCardAndModal | null>(null);
  const myRef = useRef<null | HTMLDivElement>(null);

  const scrollToPokedex = () =>
    myRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleCardClicked = (pokemon: PokemonCardAndModal) => {
    setSelectedPokemon(pokemon);
  };

  const handleClose = () => setSelectedPokemon(null);

  const handlePerPageChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChanged = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await getPokemons({
        limit: perPage,
        offset: (page - 1) * perPage,
      });

      setPokemons(response.pokemons);
    };

    fetchPokemons();
  }, [page, perPage]);

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
                  md: "400px",
                },
                margin: {
                  xs: "0 auto",
                  md: "0 0 0 auto",
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

      {selectedPokemon && (
        <PokemonDetailModal pokemon={selectedPokemon} onClose={handleClose} />
      )}

      <Box
        id="pokedex"
        ref={myRef}
        sx={{
          position: "relative",
          backgroundColor: "primary.light",
          minHeight: "100vh",
          py: { xs: 5, md: 10 },
          backgroundImage:
            "url(/images/quarter-circle-top-left.svg), url(/images/quarter-circle-bottom-right.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left, bottom right",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            textAlign="center"
            mb={5}
          >
            <Typography
              component="h2"
              sx={{ fontSize: 40, fontWeight: "bold" }}
            >
              {t("pokedex.heading")}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 16,
                  md: 24,
                },
              }}
            >
              {t("pokedex.subheading", { count })}
            </Typography>
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

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
              flexWrap: {
                xs: "wrap",
                lg: "nowrap",
              },

              ".MuiTypography-root": {
                fontWeight: "bold",
                fontSize: {
                  xs: 16,
                  md: 20,
                },
              },
            }}
          >
            <Box
              sx={{
                order: { lg: 1 },
                width: { xs: "50%", lg: "auto" },
                py: { xs: 2, lg: 0 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Per Page:</Typography>
              <NativeSelect
                overrideColor="#fff"
                defaultValue={perPage}
                sx={{
                  ml: {
                    xs: 2,
                    sm: 4,
                  },
                }}
                onChange={handlePerPageChanged}
              >
                <option value={9}>9</option>
                <option value={18}>18</option>
                <option value={36}>36</option>
              </NativeSelect>
            </Box>
            <Box
              sx={{
                order: { lg: 3 },
                width: { xs: "50%", lg: "auto" },
                py: { xs: 2, lg: 0 },
                textAlign: "right",
              }}
            >
              <Typography>Total Data: {count}</Typography>
            </Box>
            <Box
              sx={{
                order: { lg: 2 },
                display: "flex",
                justifyContent: "center",
                flex: "1 1 auto",
              }}
            >
              <Pagination
                overrideBgColor="#fff"
                overrideTextColor={`${theme.palette.primary.main}`}
                count={totalPage}
                page={page}
                perPage={perPage}
                onPageChanged={handlePageChanged}
              />
            </Box>
          </Box>
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
      initialPokemons: data.pokemons,
      count: data.count,
      next: data.next,
      previous: data.previous,
    },
  };
};
