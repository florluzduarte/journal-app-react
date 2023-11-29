import { useDispatch } from "react-redux";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({
  title = "",
  body = "",
  id,
  date,
  imageUrls = [],
}) => {
  const dispatch = useDispatch();

  const activeNote = {
    title: title,
    body: body,
    id: id,
    date: date,
    imageUrls: imageUrls,
  };

  const handleActiveNote = () => {
    dispatch(setActiveNote(activeNote));
  };

  const newTitle = useMemo(() => {
    return title.length > 16 ? title.substring(0, 16) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.number,
  imageUrls: PropTypes.array,
};
