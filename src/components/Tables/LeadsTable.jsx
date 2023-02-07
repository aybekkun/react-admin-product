import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import CreateComment from "../TableFunctions/CreateComment";
import SendMessage from "../TableFunctions/SendMessage";
import ShowComment from "../TableFunctions/ShowComment";
import ShowStatus from "../TableFunctions/ShowStatus";
const LeadsTable = ({ data, currentPage = 1 }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Leads Table">
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
                Source
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
            {data.map((lead, i) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{(currentPage - 1) * 10 + i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {lead.FIO.slice(0, 32)}
                </TableCell>
                <TableCell align="right">{lead.phone}</TableCell>
                <TableCell align="right">{lead.instrument?.name}</TableCell>
                <TableCell align="right">
                  <ShowStatus userId={lead.id} status={lead.real_status} />
                </TableCell>
                <TableCell align="right">
                  <ShowComment text={lead.comment}  />
                </TableCell>
                <TableCell align="right">{dayjs(lead.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex" }}>
                    <SendMessage userId={lead.user_id} />
                    <CreateComment userId={lead.id} />
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

export default LeadsTable;
