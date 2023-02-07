import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, Drawer, IconButton, Typography } from "@mui/material";
import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Filter from "../../components/Filter";
import ForLeadsForm from "../../components/PublicCustomForm/ForLeadsForm";
import LeadsTable from "../../components/Tables/LeadsTable";
import { fetchLeads } from "../../redux/leads/asyncActions";
import { setLeadPage } from "../../redux/leads/slice";
import { setSearchClean } from "../../redux/search/slice";
import { fetchStatus } from "../../redux/status/asyncActions";
import styles from "./Leads.module.scss";
const Leads = () => {
  const dispatch = useDispatch();
  const { data, total, currentPage, isLoading, count } = useSelector((state) => state.leads);
  const { searchParams } = useSelector((state) => state.search);
  const isMounted = React.useRef(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMounted.current) {
      (async function () {
        await dispatch(fetchLeads({ page: currentPage, take: 10, ...searchParams }));
        await dispatch(fetchStatus());
      })();
    }
    if (!isMounted.current) {
      (async function () {
        await dispatch(fetchLeads({ page: currentPage, take: 10 }));
        await dispatch(fetchStatus());
      })();
    }
    return () => {
      dispatch(setSearchClean());
    };
  }, [currentPage, dispatch, count]);

  const onSearch = async () => {
    await dispatch(fetchLeads({ page: 1, take: 10, ...searchParams }));
  };
  const onClean = async () => {
    dispatch(setSearchClean());
    await dispatch(fetchLeads({ page: 1, take: 10 }));
  };
  const onClose = () => {
    setOpen(false);
  };
  const updateData = useCallback(
    debounce(() => {
      onClean();
      setOpen(false);
    }, 500),
    []
  );
  if (data.length < 1 && isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.root}>
      <Box mb={2} display={"flex"} alignItems="flex-start">
        <Filter onSearch={onSearch} onClean={onClean} />
        <IconButton onClick={() => setOpen(true)} size="small" variant="contained" color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box width={300} p={3}>
          <Typography variant="h5" mb={2} color={"primary"}>
            Add lead
          </Typography>
          <ForLeadsForm onClose={updateData} />
        </Box>
      </Drawer>
      {/*  */}

      <LeadsTable data={data} currentPage={currentPage} />
      <CustomPagination
        currentPage={currentPage}
        total={total}
        handleChangePage={(value) => dispatch(setLeadPage(value))}
      />
    </div>
  );
};

export default Leads;
