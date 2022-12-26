import { Fragment } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

import { getPokemon, getPokemonEvolution } from "@/libs/api";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "querystring";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { PokemonDetail, PokemonEvolution } from "@/types/Pokemon";

import PokemonInfo from "@/components/PokemonInfo";
import Stat from "@/components/Stat";

interface IParams extends ParsedUrlQuery {
  id: string;
}

type DetailProps = {
  pokemon: PokemonDetail;
  evolutions: PokemonEvolution[];
};

export default function Detail({ pokemon, evolutions }: DetailProps) {
  const { t } = useTranslation("common");

  const sprites = Object.keys(pokemon.sprites).filter(
    (key) =>
      key !== "other" && key !== "versions" && pokemon.sprites[key] !== null
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 3, md: 5 } }}>
      <PokemonInfo pokemon={pokemon} />

      <Stack direction="column" spacing={4}>
        <Stack direction="column" spacing={2}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: 16,
                md: 20,
              },
            }}
          >
            Other Images:
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{
              "& > *": {
                m: 2,
              },
            }}
          >
            {sprites.map((key) => (
              <Box
                sx={{
                  width: {
                    xs: "150px",
                    sm: "200px",
                  },
                  "&:hover img": {
                    animation: `wobble .9s ease-out`,
                  },
                }}
                key={key}
              >
                <Image
                  src={pokemon.sprites[key]}
                  alt={pokemon.name + " sprite"}
                  width={200}
                  height={200}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: 16,
                md: 20,
              },
            }}
          >
            Stats:
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{
              "& > *": {
                m: 2,
              },
            }}
          >
            {pokemon.stats.map((stat) => (
              <Box
                sx={{
                  width: "150px",
                }}
                key={stat.stat.name}
              >
                <Stat value={stat.base_stat} label={stat.stat.name} />
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: 16,
                md: 20,
              },
            }}
          >
            Evolution:
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            sx={{
              "& > *": {
                m: 2,
              },
            }}
          >
            {evolutions.map((ev, index) => (
              <Fragment key={ev.id}>
                {index > 0 && (
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 40,
                      transform: {
                        xs: "rotateZ(90deg)",
                        md: "rotateZ(0)",
                      },
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link href={`/pokemon/${ev.id}`}>
                    <Box
                      sx={{
                        width: {
                          xs: "150px",
                          sm: "200px",
                        },
                        "&:hover img": {
                          animation: `wobble .9s ease-out`,
                        },
                      }}
                    >
                      <Image
                        src={ev.sprite}
                        alt={ev.formattedName + " sprite"}
                        width={200}
                        height={200}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Box>
                  </Link>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: {
                        xs: 16,
                        md: 20,
                      },
                    }}
                  >
                    {ev.formattedName}
                  </Typography>
                </Box>
              </Fragment>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // pre-render 1-18 pokemon
  const paths = Array.from([...Array(18)].keys()).map((id) => ({
    params: { id: (id + 1).toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params as IParams;

  if (!id) {
    return {
      notFound: true,
    };
  }

  let data = await getPokemon(id);

  let evoData = await getPokemonEvolution(id);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      pokemon: data,
      evolutions: evoData,
    },
    revalidate: 60,
  };
};
