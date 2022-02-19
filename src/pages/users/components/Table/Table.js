import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip, Box, Button,
} from "@material-ui/core";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
import { removeUnderscoreAndCapitalize, timeConverter } from "../../../../utils/date-parse";
import SendIcon from "@material-ui/icons/Send";
import GetAppIcon from '@material-ui/icons/GetApp';
const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data, onDownloadHistory, onDownloadUserHistory }) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({username}, index) => (
            <TableRow key={index}>
              <TableCell align={"left"}>{index+1}</TableCell>
              <TableCell align={"left"}>{username}</TableCell>
              <TableCell align={"left"}>
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={()=>onDownloadHistory(username)}
                  startIcon={<GetAppIcon/>}>Download Contacted List</Button>
              </TableCell>
              <TableCell align={"left"}>
                <Button
                  style={{marginLeft:"20px"}}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={()=>onDownloadUserHistory(username)}
                  startIcon={<GetAppIcon/>}>Download Chat History</Button>
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
