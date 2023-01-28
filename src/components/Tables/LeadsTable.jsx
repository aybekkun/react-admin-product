import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import SendMessage from "../SendMessage";

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
                  {lead.FIO}
                </TableCell>
                <TableCell align="right">{lead.phone}</TableCell>
                <TableCell align="right">{lead.source}</TableCell>
                <TableCell align="right">{lead.status}</TableCell>
                <TableCell align="right">{lead.comment}</TableCell>
                <TableCell align="right">{dayjs(lead.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  <SendMessage userId={lead.user_id} />
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
