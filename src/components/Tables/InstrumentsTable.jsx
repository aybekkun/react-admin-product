import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const InstrumentsTable = ({ data, currentPage = 1 }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="courses Table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "70px" }} align="left">
                №
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="left">
                Name
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Sum
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Clicked
              </TableCell>
              <TableCell align="right">Distribution</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Link</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{(currentPage - 1) * 10 + i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="right">{item.clicked}</TableCell>
                <TableCell align="right">{item.distribution}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(item.link);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{dayjs(item.createdAt).format("DD-MM-YYYY")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InstrumentsTable;
