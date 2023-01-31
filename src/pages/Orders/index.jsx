import { CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination";
import Filter from "../../components/Filter";
import OrdersTable from "../../components/Tables/OrdersTable";
import { fetchOrders } from "../../redux/orders/asyncActions";
import { setOrderPage } from "../../redux/orders/slice";
import { setSearchClean } from "../../redux/search/slice";
import styles from "./Orders.module.scss";
const Orders = () => {
  const dispatch = useDispatch();
  const { data, total, currentPage, isLoading } = useSelector((state) => state.orders);
  const { searchParams } = useSelector((state) => state.search);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      (async function () {
        await dispatch(fetchOrders({ page: currentPage, take: 10, ...searchParams }));
      })();
    }
    if (!isMounted.current) {
      (async function () {
        await dispatch(fetchOrders({ page: currentPage, take: 10 }));
      })();
    }
    isMounted.current = true;
    return () => {
      dispatch(setSearchClean());
    };
  }, [currentPage, dispatch]);

  if (data.length < 1 && isLoading) {
    return <CircularProgress />;
  }

  const onSearch = async () => {
    await dispatch(fetchOrders({ page: 1, take: 10, ...searchParams }));
  };
  const onClean = async () => {
    dispatch(setSearchClean());
    await dispatch(fetchOrders({ page: 1, take: 10 }));
  };

  return (
    <div className={styles.root}>
      <Filter onSearch={onSearch} onClean={onClean} />
      <OrdersTable data={data} />
      <CustomPagination
        handleChangePage={(value) => dispatch(setOrderPage(value))}
        currentPage={currentPage}
        total={total}
      />
    </div>
  );
};

export default Orders;
