import Box from "@mui/material/Box";
import MUIChip from "@mui/material/Chip";
import getTypeColour from "@/libs/getTypeColour";
import { capitalize } from "@/libs/helpers";

type ChipProps = {
  type: string;
};

export default function Chip({ type }: ChipProps) {
  return (
    <MUIChip
      sx={{
        background: getTypeColour(type),
        color: "#fff",
        fontSize: "1rem",
        px: 1,
        py: 1,
        fontWeight: "bold",
      }}
      label={capitalize(type)}
    />
  );
}
