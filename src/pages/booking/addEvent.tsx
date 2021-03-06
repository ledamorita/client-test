import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

interface Props {
  handleClose: () => any;
  dateStr: string;
  setShow: Function;
}

const AddEvent: React.FC<Props> = (Props) => {
  const [data, setData] = useState({
    realname: "",
    timeslot: "",
  });

  const [timeslot, setTimeslot] = useState("");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setTimeslot(event.target.value as string);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    data.timeslot = timeslot;
    if (data.realname === "" || data.timeslot === "") {
      alert("Can't be empty!");
    } else {
      axios
        .post("/addSchedule", {
          data: {
            dateStr: Props.dateStr,
            timeslot,
            realname: data.realname,
            username: localStorage.getItem("username"),
            role: Number(localStorage.getItem("role")),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              alert("Add schedule success");
              Props.setShow(false);
            } else {
              alert(res.data.msg);
              Props.setShow(false);
            }
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.warn(e);
        });
    }
  };

  return (
    <Dialog open={true} onClose={Props.handleClose}>
      <DialogTitle>Add Event</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            name="realname"
            value={data.realname}
            placeholder="Name"
            onChange={handleChange}
          ></TextField>

          <Select
            onChange={handleChangeSelect}
            name="timeslot"
            value={timeslot}
          >
            <MenuItem value={"am"}>?????????</MenuItem>
            <MenuItem value={"pm"}>??????</MenuItem>
            <MenuItem value={"all"}>??????</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={Props.handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEvent;
