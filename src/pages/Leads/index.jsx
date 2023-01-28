import { CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Filter from "../../components/Filter";
import LeadsTable from "../../components/Tables/LeadsTable";
import { fetchLeads } from "../../redux/leads/asyncActions";
import { setLeadPage } from "../../redux/leads/slice";
import { setSearchClean } from "../../redux/search/slice";
import styles from "./Leads.module.scss";
const Leads = () => {
  const dispatch = useDispatch();
  const { data, total, currentPage, isLoading } = useSelector((state) => state.leads);
  const { searchParams } = useSelector((state) => state.search);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      (async function () {
        await dispatch(fetchLeads({ page: currentPage, take: 10, ...searchParams }));
      })();
    }
    if (!isMounted.current) {
      (async function () {
        await dispatch(fetchLeads({ page: currentPage, take: 10 }));
      })();
    }
    return () => {
      dispatch(setSearchClean());
    };
  }, [currentPage, dispatch]);

  if (data.length < 1 && isLoading) {
    return <CircularProgress />;
  }

  const onSearch = async () => {
    await dispatch(fetchLeads({ page: 1, take: 10, ...searchParams }));
  };
  const onClean = async () => {
    dispatch(setSearchClean());
    await dispatch(fetchLeads({ page: 1, take: 10 }));
  };
  return (
    <div className={styles.root}>
      <Filter onSearch={onSearch} onClean={onClean} />
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
