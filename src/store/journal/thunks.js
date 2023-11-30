import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdate,
  setPhotosToActiveNote,
  deleteNoteByID,
} from "./journalSlice";
import { loadNotes, uploadFile } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));

    // const setDocResponse = await setDoc(newDoc, newNote);
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(noteUpdate(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // await uploadFile(files[0]);

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(uploadFile(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

export const startDeletingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteByID(note.id));
  };
};
