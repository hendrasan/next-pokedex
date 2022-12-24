/* eslint-disable react/no-unescaped-entities */

import * as React from "react";
import { styled, darken } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@/components/Link";
import { Stack } from "@mui/system";
import { Button, Card, CardContent } from "@mui/material";
import { PrimaryButton } from "@/components/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

export default function Home() {
  const myRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToPokedex = () =>
    myRef.current?.scrollIntoView({ behavior: "smooth" });

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
                All the Pokémon data you'll ever need in one place!
              </Typography>
              <Typography sx={{ color: "gray.main" }}>
                Thousands of data compiled into one place
              </Typography>
              <PrimaryButton
                sx={{ mt: 4, alignSelf: "flex-start" }}
                onClick={scrollToPokedex}
              >
                Check PokèDex
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
              PokèDex
            </Typography>
            <Typography>All Generation totaling 999999 Pokemon</Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Poke Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Poke Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Poke Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Poke Name
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
