import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import CreateComment from "../TableFunctions/CreateComment";
import SendMessage from "../TableFunctions/SendMessage";
import ShowComment from "../TableFunctions/ShowComment";
import ShowStatus from "../TableFunctions/ShowStatus";

const OrdersTable = ({ data = [], currentPage = 1 }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="orders Table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "70px" }} align="left">
                №
              </TableCell>
              <TableCell sx={{ width: "25%" }}>Name</TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Phone
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Course
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Status
              </TableCell>
              <TableCell sx={{ width: "15%" }} align="right">
                Comment
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Date
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order, i) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {order.FIO}
                </TableCell>
                <TableCell align="right">{order.phone}</TableCell>
                <TableCell align="right">{order.course?.name}</TableCell>
                <TableCell align="right"><ShowStatus status={order.order_status}/></TableCell>
                <TableCell align="right">
                  <ShowComment text={order.order_comment} />
                </TableCell>
                <TableCell align="right">{dayjs(order.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex" }}>
                    <SendMessage userId={order.lead?.user_id} />
                    <CreateComment userId={order.lead?.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
