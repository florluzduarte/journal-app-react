import { Grid, Typography } from "@mui/material";
import { StarOutline } from "@mui/icons-material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 112px)",
        backgroundColor: "primary.main",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 90, color: "white" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant="h6">
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};