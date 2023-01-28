import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const CourseTable = ({ data, currentPage = 1 }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="courses Table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "70px" }} align="left">
                №
              </TableCell>
              <TableCell sx={{ width: "100px" }}>Name</TableCell>
              <TableCell sx={{ width: "40%" }} align="left">
                Description
              </TableCell>
              <TableCell sx={{ width: "100px" }} align="right">
                Clicked
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
            {data.map((course, i) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{(currentPage - 1) * 10 + i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {course.name}
                </TableCell>
                <TableCell align="left">{course.description}</TableCell>
                <TableCell align="right">{course.clicked}</TableCell>
                <TableCell align="right">{dayjs(course.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseTable;
