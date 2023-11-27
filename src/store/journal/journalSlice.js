import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: true,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //     id: "ABC1234",
    //     title: "",
    //     body: "",
    //     date: 123456,
    //     imageURLs: [],
    // }
  },
  reducers: {
    //Solo funciones síncronas

    //Inicializa una nueva nota
    addNewEmptyNote: (state, action) => {},

    //Muestra la nota seleccionada
    setActiveNote: (state, action) => {},

    //Carga las notas que hay en la app
    setNotes: (state, action) => {},

    //Cambia el estado de saving al momento de guardar
    setSaving: (state) => {},

    //Modifica una nota determinada
    updateNote: (state, action) => {},

    //Eliminar una nota específica
    deleteNoteByID: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteByID,
} = journalSlice.actions;
