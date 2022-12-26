import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

import Image from "next/image";
import Link from "@/components/Link";

import Chip from "@/components/Chip";
import { NativeSelect } from "@/components/NativeSelect";
import Pagination from "@/components/Pagination";

import { PokemonCardAndModal } from "@/types/Pokemon";
import { padWithZero } from "@/libs/helpers";

export default function PokemonTable({
  color,
  pokemons,
}: {
  color: string;
  pokemons: PokemonCardAndModal[];
}) {
  const theme = useTheme();
  const smallAndAbove = useMediaQuery(theme.breakpoints.up("lg"));
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const totalPokemons = pokemons.length;
  const totalPage = Math.ceil(totalPokemons / perPage);

  const paginatedPokemons = pokemons.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handlePerPageChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setPerPage(Number(e.target.value));
  };

  // reset page to 1 every time sets of pokemons change
  useEffect(() => {
    setPage(1);
  }, [pokemons]);

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, .85)",
        borderRadius: "24px",
        padding: "20px",
        boxShadow: "0px 0px 32px rgba(0, 0, 0, 0.08);",
      }}
    >
      <Stack direction="column" spacing={3} divider={<Divider flexItem />}>
        {paginatedPokemons.map((pokemon) => (
          <Link
            key={pokemon.id}
            href={`/pokemon/${pokemon.id}`}
            sx={{
              textDecoration: "none",
              color: "neutral.main",
            }}
          >
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{
                xs: 1,
                lg: 3,
              }}
              alignItems="center"
              divider={
                smallAndAbove ? (
                  <Divider orientation="vertical" flexItem />
                ) : null
              }
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flex: {
                    lg: "0 0 100px",
                  },
                }}
              >
                <Image
                  src={pokemon.sprite}
                  alt={pokemon.name + " sprite"}
                  width={100}
                  height={100}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: 16,
                    lg: 20,
                  },
                  flex: {
                    lg: "0 0 80px",
                  },
                }}
              >
                #{padWithZero(pokemon.id, 3)}
              </Typography>

              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: 16,
                    lg: 20,
                  },
                  flex: {
                    lg: "0 0 150px",
                  },
                }}
              >
                {pokemon.formattedName}
              </Typography>

              <Stack
                direction="row"
                // spacing={2}
                sx={{
                  flex: {
                    lg: "0 1 auto",
                  },

                  ".MuiChip-root": {
                    margin: 1,
                  },
                }}
              >
                {pokemon.types.map(({ type }) => (
                  <Chip key={type.name} type={type.name} />
                ))}
              </Stack>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color,
          flexWrap: {
            xs: "wrap",
            lg: "nowrap",
          },

          ".MuiTypography-root": {
            fontWeight: "bold",
            fontSize: {
              xs: 10,
              lg: 12,
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
            className="dense"
            defaultValue={9}
            overridecolor={color}
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
          <Typography>Total Data: {totalPokemons}</Typography>
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
            classNames="dense"
            overridebgcolor={color}
            overridetextcolor="#fff"
            count={totalPage}
            page={page}
            perPage={perPage}
            onPageChanged={(page: number) => setPage(page)}
          />
        </Box>
      </Box>
    </Box>
  );
}
