import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import Image from "next/image";

import Chip from "@/components/Chip";
import { PokemonCardItem } from "@/types/Pokemon";
import { padWithZero } from "@/libs/helpers";
import styled from "@emotion/styled";

const StyledCard = styled(Card)({
  cursor: "pointer",
  borderRadius: "24px",
  boxShadow: "5px 10px 25px rgba(0, 0, 0, 0.35)",

  img: {
    transition: "transform 0.2s ease-in-out",
  },

  "&:hover img": {
    // transform: "scale(1.1)",
    animation: `wobble .9s ease-out`,
  },

  "@keyframes wobble": {
    "0%, 100%": {
      transform: "translateX(0%)",
      transformOrigin: "50% 50%",
    },
    "15%": {
      transform: "translateX(-20px) rotate(-6deg)",
    },
    "30%": {
      transform: "translateX(10px) rotate(6deg)",
    },
    "45%": {
      transform: "translateX(-10px) rotate(-3.6deg)",
    },
    "60%": {
      transform: "translateX(5px) rotate(2.4deg)",
    },
    "75%": {
      transform: "translateX(-3px) rotate(-1.2deg)",
    },
  },
});

type PokemonCardProps = {
  pokemon: PokemonCardItem;
  onCardClicked: () => void;
};

export default function PokemonCard({
  pokemon,
  onCardClicked,
}: PokemonCardProps) {
  return (
    <StyledCard onClick={onCardClicked}>
      <CardContent
        sx={{
          px: {
            xs: 2,
            md: 3,
          },
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={pokemon.sprite}
            alt={pokemon.name + " sprite"}
            width={200}
            height={200}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontSize: {
              xs: 14,
              md: 16,
              lg: 20,
            },
            fontWeight: "bold",
            color: "#B3B6B8",
          }}
        >
          #{padWithZero(pokemon.id, 3)}
        </Typography>

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
          }}
        >
          {pokemon.formattedName}
        </Typography>

        <Grid container spacing={1} sx={{ px: 0 }}>
          {pokemon.types.map(({ type }) => (
            <Grid xs={6} key={type.name}>
              <Chip type={type.name} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
}
