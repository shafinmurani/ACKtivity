import React from "react";
import { TextField, Typography, Button, Grid, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import completedAudio from "../audio/completed.mp3";
import deletedAudio from "../audio/deleted.mp3";
import clickAudio from "../audio/click.mp3";
import ReactMarkdown from "react-markdown";
import Fade from "@mui/material/Fade";

const style = {
  position: "static",
  marginInline: "auto",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "2rem",
  //   borderRadius: "20px",
  whiteSpace: "pre-line",
};

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], title: "", note: "", itter: 1, open: false };
  }
  render() {
    const audio = (variable) => {
      new Audio(variable).play();
    };
    const handleOpen = () => this.setState({ open: true });
    const handleClose = () => this.setState({ open: false });
    if (this.state.itter == 1) {
      if (window.localStorage.getItem("notes")) {
        this.setState({
          notes: JSON.parse(window.localStorage.getItem("notes")),
        });
      }
      this.setState({ itter: 2 });
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography>Note Keeper</Typography>
        <TextField
          defaultValue={this.state.title}
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
          label="Title"
        />
        <TextField
          defaultValue={this.state.note}
          onChange={(e) => {
            this.setState({ note: e.target.value });
          }}
          label="Note(Markdown)"
          minRows={4}
          multiline
        />
        <Button
          variant="contained"
          style={{ width: "8rem", alignSelf: "flex-start" }}
          startIcon={<AddIcon />}
          onClick={() => {
            audio(clickAudio);
            this.state.notes.push({
              id: this.state.notes.length,
              title: this.state.title,
              note: this.state.note,
            });
            this.setState({
              itter: 2,
            });
            window.localStorage.setItem(
              "notes",
              JSON.stringify(this.state.notes)
            );
            // console.log(this.state.notes);
          }}
        >
          Add
        </Button>
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            justifyContent: "center",
            marginInline: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          {this.state.notes.map((val, key) => {
            return (
              <Grid
                style={{
                  display: "flex",
                  flex: "1",
                  padding: "1rem",
                  //   borderRadius: "10px",
                  backgroundColor: "#272727",
                  minWidth: "15rem",
                  alignItems: "center",
                  gap: "2rem",
                  justifyContent: "center",
                }}
                key={key}
                item
                lg
              >
                <Typography variant="h6">{val.title}</Typography>
                <Button
                  variant="contained"
                  style={{ alingSelf: "flex-end", width: "7rem" }}
                  onClick={handleOpen}
                >
                  <OpenInFullIcon />
                </Button>
                <Modal
                  style={{ overflow: "scroll" }}
                  open={this.state.open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Fade in={this.state.open}>
                    <Box sx={style}>
                      <Button
                        style={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                          // width: "7rem",
                        }}
                        variant="contained"
                        color="warning"
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </Button>

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {val.title}
                      </Typography>
                      <ReactMarkdown
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                      >
                        {val.note}
                      </ReactMarkdown>
                    </Box>
                  </Fade>
                </Modal>
                <Button
                  color="error"
                  style={{ width: "7rem" }}
                  variant="contained"
                  onClick={() => {
                    audio(deletedAudio);
                    this.setState({
                      notes: this.state.notes.splice(key, 1),
                    });
                    window.localStorage.setItem(
                      "notes",
                      JSON.stringify(this.state.notes)
                    );
                    this.setState({
                      notes: JSON.parse(window.localStorage.getItem("notes")),
                    });
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
