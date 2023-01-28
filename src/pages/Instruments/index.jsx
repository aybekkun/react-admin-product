import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress, Drawer, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InstrumentsTable from "../../components/Tables/InstrumentsTable";
import { createInstruments, fetchInstruments } from "../../redux/instruments/asyncActions";
import { setInstrumentsCount } from "../../redux/instruments/slice";
import styles from "./Instruments.module.scss";
const Instruments = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSending, count } = useSelector((state) => state.instruments);
  const [drawer, setDrawer] = React.useState(false);
  const [form, updateForm] = React.useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { name: "", price: 0, type: "Web" }
  );
  React.useEffect(() => {
    (async function () {
      await dispatch(fetchInstruments());
    })();
  }, [count]);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createInstruments({ name: form.name, price: Number(form.price), type: form.type }));
    dispatch(setInstrumentsCount());
    updateForm({ name: "", price: 0, type: "Web" });
    setDrawer(false);
  };
  if (data.length < 1 && isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className={styles.root}>
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={() => setDrawer(true)} size="small" variant="contained" startIcon={<AddIcon />}>
          Add
        </Button>
        <Drawer anchor={"right"} open={drawer} onClose={() => setDrawer(false)}>
          <div className={styles.drawer}>
            <h3>Instruments</h3>
            <form onSubmit={onSubmit}>
              <TextField
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                type="text"
                margin="dense"
                size="small"
                label="Instruments name"
                variant="outlined"
                fullWidth
                required
                inputProps={{
                  maxLength: 25,
                }}
              />
              <TextField
                value={form.price}
                onChange={(e) => updateForm({ price: e.target.value })}
                type="number"
                margin="dense"
                size="small"
                label="Price  "
                variant="outlined"
                fullWidth
                required
                inputProps={{
                  maxLength: 125,
                  min: 0,
                }}
              />

              <Select
                sx={{ display: "block", margin: "10px 0" }}
                value={form.type}
      
                size="small"
                onChange={(e) => updateForm({ type: e.target.value })}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={"Web"}>Web</MenuItem>
                <MenuItem value={"Telegram Bot"}>Telegram bot</MenuItem>
              </Select>
              <Button disabled={isSending} size="small" type="submit" variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Drawer>
      </div>
      <InstrumentsTable data={data} />
    </div>
  );
};

export default Instruments;
