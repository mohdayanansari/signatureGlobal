import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip, Box,
} from "@material-ui/core";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
import { removeUnderscoreAndCapitalize, timeConverter } from "../../../../utils/date-parse";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();

  if(data.length > 0){
    var keys = Object.keys(data[0]).map(i => removeUnderscoreAndCapitalize(i));
    return (
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {keys.map(key => (
              <TableCell key={key} style={{fontWeight:"bold"}}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({template_name, number,file,type,broadcast_name, status , timestamp}, index) => (
            <TableRow key={index}>
              <TableCell align={"left"}>{number}</TableCell>
              <TableCell align={"left"}>{type}</TableCell>
              <TableCell align={"left"}>{template_name}</TableCell>
              <TableCell align={"left"}>{broadcast_name}</TableCell>
              <TableCell align={"left"}>{file}</TableCell>
              <TableCell align={"left"}>{timeConverter(timestamp)}</TableCell>
              <TableCell align={"left"}>
                <Chip label={status} classes={{root: classes[states[status.toLowerCase()]]}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }else{
    return <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box height={"100px"}/>
    <Typography size={"xl"}>You don't have any message list yet !!</Typography>
      <Box height={"200px"}/>
    </Box>
  }

}
