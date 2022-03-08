import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip, Box, IconButton,
} from "@material-ui/core";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
import { removeUnderscoreAndCapitalize, timeConverter } from "../../../../utils/date-parse";
import SendIcon from "@material-ui/icons/Send";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {Edit} from "@material-ui/icons";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data, onDownloadHistory, onDownloadUserHistory,onEditUser }) {
  const classes = useStyles();

  if(data.length > 0){
    var keys = Object.keys(data[0]).map(i => removeUnderscoreAndCapitalize(i));
    return (
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>S.No</TableCell>
            {keys.map(key => (
              <TableCell key={key} style={{fontWeight:"bold"}}>{key}</TableCell>
            ))}
            <TableCell align={"center"} style={{fontWeight:"bold"}}>Download Contacted List</TableCell>
            <TableCell align={"center"} style={{fontWeight:"bold"}}>Download Chat List</TableCell>
            <TableCell align={"center"} style={{fontWeight:"bold"}}> Edit User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({username}, index) => (
            <TableRow key={index}>
              <TableCell align={"left"}>{index+1}</TableCell>
              <TableCell align={"left"}>{username}</TableCell>
              <TableCell align={"center"}>
                <IconButton
                  size="medium"
                  color="secondary"
                  onClick={()=>onDownloadHistory(username)}>
                  <CloudDownloadIcon/>
                </IconButton>
              </TableCell>
              <TableCell align={"center"}>
                <IconButton
                  size="medium"
                  color="secondary"
                  onClick={()=>onDownloadUserHistory(username)}>
                  <CloudDownloadIcon/>
                </IconButton>
              </TableCell>
              <TableCell align={"center"}>
                <IconButton
                    size="medium"
                    color="secondary"
                    onClick={()=>onEditUser(username)}>
                  <Edit/>
                </IconButton>
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
