import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import Link from "@/components/Link";
import { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import clsx from "clsx";

import { capitalize } from "@/libs/helpers";
import { getTypes, getPokemonsByType } from "@/libs/api";
import { PokemonCardAndModal } from "@/types/Pokemon";
import getTypeColor from "@/libs/getTypeColor";
import PokemonTable from "@/components/PokemonTable";

type PokemonTypeColor = {
  name: string;
  color: string;
};

export default function Type({ types }: { types: PokemonTypeColor[] }) {
  const { t } = useTranslation("common");
  const { query, pathname, isReady } = useRouter();

  const [pokemons, setPokemons] = useState<PokemonCardAndModal[]>([]);

  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonsByType = async (type: string) => {
      const pokemons = await getPokemonsByType(type);

      setPokemons(pokemons);
    };

    if (type) {
      fetchPokemonsByType(type);
    } else {
      setType(null);
    }
  }, [type]);

  useEffect(() => {
    if (!isReady) return;

    if (query.type) {
      if (Array.isArray(query.type)) {
        setType(query.type[0]);
      } else {
        setType(query.type);
      }
    } else {
      setType(null);
    }
  }, [query, isReady]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          top: "100%",
          width: {
            xs: "150px",
            md: "220px",
            lg: "240px",
          },
        }}
      >
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 392 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 670C156.64 670 282 544.64 282 390C282 235.36 156.64 110 2 110"
            stroke={`${getTypeColor(type ?? "")}`}
            strokeWidth="220"
            strokeLinecap="round"
          />
        </svg>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: "0",
          top: "10%",
          width: {
            xs: "150px",
            md: "220px",
            lg: "240px",
          },
        }}
      >
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 390 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M390 110C235.36 110 110 235.36 110 390C110 544.64 235.361 670 390 670"
            stroke={`${getTypeColor(type ?? "")}`}
            strokeWidth="220"
            strokeLinecap="round"
          />
        </svg>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 3, md: 5 }, position: "relative" }}
      >
        <Grid container justifyContent="space-between">
          <Grid
            xs={12}
            md={3}
            sx={{
              borderRight: {
                xs: "none",
                md: "1px solid #ECEDED",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: 16,
                  md: 20,
                },
              }}
            >
              {t("pokemonTypes")}
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 2,
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
                    "active-type": pokeType.name === type,
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
          </Grid>

          <Grid xs={12} md={8}>
            {!type ? (
              <Typography variant="h4" component="h1" gutterBottom>
                {t("selectAType")}
              </Typography>
            ) : (
              <>
                <Typography variant="h4" component="h1" gutterBottom>
                  {t("pokemonWithType", { type: capitalize(type ?? "") })}
                </Typography>

                <PokemonTable
                  color={getTypeColor(type ?? "")}
                  pokemons={pokemons}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let types = await getTypes();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
      types,
    },
  };
};
