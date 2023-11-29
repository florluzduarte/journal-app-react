import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import {
  setActiveNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";
import { useRef } from "react";

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { title, body, date, handleFormChange, formState } = useForm(note);

  const finalFormatDate = useMemo(() => {
    const formatDate = new Date(date);
    return formatDate.toUTCString();
  }, [date]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState, dispatch]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const fileInputRef = useRef();

  const handleNoteSave = () => {
    dispatch(startSavingNote());
  };

  const handleFileInputChange = (event) => {
    if (event.target.files.length === 0) return;
    dispatch(startUploadingFiles(event.target.files));
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={32} fontWeight="ligth">
          {finalFormatDate}
        </Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={handleNoteSave}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={handleFormChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          minRows={5}
          placeholder="¿Qué pasó en el día de hoy?"
          label="Daily"
          name="body"
          value={body}
          onChange={handleFormChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
