import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { createStatus, deleteStatus, editStatus, fetchStatus } from "../../../redux/status/asyncActions";
import { setStatusCount } from "../../../redux/status/slice";
import CancelIcon from "@mui/icons-material/Cancel";
const LeadStatus = () => {
  const dispatch = useDispatch();
  const { data, isLoading, count } = useSelector((state) => state.status);
  const [status, setStatus] = React.useState("");
  const [statusId, setStatusId] = React.useState(0);
  const [type, setType] = React.useState("add");

  React.useEffect(() => {
    (async function () {
      await dispatch(fetchStatus());
    })();
  }, [count]);
  const onDelete = async (id) => {
    if (window.confirm("Delete status?")) {
      await dispatch(deleteStatus({ id: id }));
      dispatch(setStatusCount());
    }
  };
  const onAddStatus = async (e) => {
    e.preventDefault();
    if (status.length > 0) {
      await dispatch(createStatus({ name: status }));
      dispatch(setStatusCount());
      setStatus("");
    }
  };

  const onEditStatus = async (e) => {
    e.preventDefault();
    if (status.length > 0) {
      await dispatch(editStatus({ id: statusId, name: status }));
      dispatch(setStatusCount());
      setStatus("");
      setType("add");
      setStatusId(0);
    }
  };
  const onClickEdit = (name, id) => {
    setType("edit");
    setStatusId(id);
    setStatus(name);
  };
  
  return (
    <Box mt={2} component={Paper} p={3} width={400} minHeight={200}>
      <Typography variant="h5" color="primary">
        User status
      </Typography>
      {type === "add" && (
        <form onSubmit={onAddStatus}>
          <Box position={"relative"} display={"flex"}>
            <TextField
              inputProps={{ minLength: 3, maxLength: 30 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
              fullWidth
              required
            />
            <IconButton type="submit" sx={{ position: "absolute", right: 0 }} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </form>
      )}
      {type === "edit" && (
        <form onSubmit={onEditStatus}>
          <Box position={"relative"} display={"flex"}>
            <TextField
              inputProps={{ minLength: 3, maxLength: 30 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
              fullWidth
              required
            />
            <IconButton type="submit" sx={{ position: "absolute", right: "2rem" }} color="primary">
              <AddIcon />
            </IconButton>
            <IconButton sx={{ position: "absolute", right: 0 }} onClick={() => setType("add")} color="primary">
              <CancelIcon />
            </IconButton>
          </Box>
        </form>
      )}

      <Box sx={{ maxHeight: 250, overflow: "auto" }}>
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                {(item.name !== "started" && item.name !== "ordered" && item.name !== "registred") && (
                  <>
                    <IconButton onClick={() => onClickEdit(item.name, item.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default LeadStatus;
