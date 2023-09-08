// import { Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        repellendus, ipsa aliquid autem magnam ipsam recusandae optio, quidem
        assumenda eos sit aspernatur sapiente explicabo facere sed. Accusamus
        expedita nulla nesciunt?
      </Typography> */}
      <NothingSelectedView />
      {/* NoteView */}
    </JournalLayout>
  );
};
