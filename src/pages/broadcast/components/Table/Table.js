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
      <Table className="table-auto   shadow-2xl rounded-sm">
        <TableHead className={"bg-white/20"}>
          <TableRow>
            {keys.map(key => (
              <TableCell key={key} style={{fontWeight:"bold"}} className={"text-white/80 border-b-white/10 "}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({template_name, number,file,type,broadcast_name, status , timestamp}, index) => (
            <TableRow key={index} className="border-r !border-white/10">
              <TableCell align={"left"} className={"text-white !border-x !border-white/10"} style={{width:10,overflow:"hidden"}}>{number}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"}>{type}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"} >{template_name}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"}>{broadcast_name}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"}>{file}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"}>{timeConverter(timestamp)}</TableCell>
              <TableCell align={"left"} className={"text-white !border-r !border-white/10"}>
                <Chip label={status} classes={{root: classes[states[status.toLowerCase()]]}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }else{
    return (<div className="grid grid-cols-12">
      <div className="col-span-12 py-[100px] overflow-hidden flex justify-center	items-center">
        <h2 className="text-white opacity-80 text-[30px] font-regular ">
          You don't have any templates history yet !!
        </h2>
      </div>
    </div>)
  }
}
