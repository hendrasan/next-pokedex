import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import Image from "next/image";

import Chip from "@/components/Chip";

export default function PokemonCard() {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        boxShadow: "5px 10px 25px rgba(0, 0, 0, 0.35)",
      }}
    >
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
        <Box>
          <Image
            src="/images/placeholder.jpg"
            alt="placeholder"
            width={200}
            height={200}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Typography variant="caption">#001</Typography>

        <Typography variant="h5" component="h2">
          Poke Name
        </Typography>

        <Grid container spacing={1} sx={{ px: 0 }}>
          <Grid xs={6}>
            <Chip type="fire" />
          </Grid>
          <Grid xs={6}>
            <Chip type="grass" />
          </Grid>
          <Grid xs={6}>
            <Chip type="flying" />
          </Grid>
          <Grid xs={6}>
            <Chip type="psychic" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
