// import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { AddOutlined } from "@mui/icons-material";
import { NoteView, NothingSelectedView } from "../views";
import { savingNewNote, startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active } = useSelector((state) => state.journal);

  const handleNewNote = () => {
    dispatch(startNewNote());
    dispatch(savingNewNote());
  };

  return (
    <JournalLayout>
      {active === null ? <NothingSelectedView /> : <NoteView />}

      <IconButton
        onClick={handleNewNote}
        disabled={isSaving === true}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 24 }} />
      </IconButton>
    </JournalLayout>
  );
};
