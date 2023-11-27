import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
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

    //Previene doble llamada a la DB
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    //Inicializa una nueva nota
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    //Muestra la nota seleccionada
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },

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
  savingNewNote,
} = journalSlice.actions;
