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
    //     imageUrls: [],
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
      state.messageSaved = "";
    },

    //Carga las notas que hay en la app
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    //Cambia el estado de saving al momento de guardar
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },

    //Ajusta el [] de notas cuando alguna de ellas es modificada
    noteUpdate: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `${action.payload.title}, fue actualizada correctamente`;
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },

    //Eliminar una nota específica
    deleteNoteByID: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdate,
  deleteNoteByID,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
