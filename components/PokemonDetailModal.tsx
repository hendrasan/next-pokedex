import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";

import { PokemonCardAndModal } from "@/types/Pokemon";
import { useTranslation } from "next-i18next";

import PokemonInfo from "@/components/PokemonInfo";

type PokemonDetailModalProps = {
  pokemon: PokemonCardAndModal;
  onClose: () => void;
};

export default function PokemonDetailModal({
  pokemon,
  onClose,
}: PokemonDetailModalProps) {
  const { t } = useTranslation("common");

  return (
    <Dialog
      open={!!pokemon}
      fullWidth={true}
      maxWidth="lg"
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          margin: {
            xs: 2,
            sm: 2,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <PokemonInfo pokemon={pokemon} isInModal />
      </DialogContent>
    </Dialog>
  );
}
