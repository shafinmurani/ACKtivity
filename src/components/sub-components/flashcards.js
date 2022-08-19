import React from "react";
import { TextField, Typography, Button, Grid, Modal, Box } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import completedAudio from "../audio/completed.mp3";
import deletedAudio from "../audio/deleted.mp3";
import clickAudio from "../audio/click.mp3";
import ReactMarkdown from "react-markdown";
import Fade from "@mui/material/Fade";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import QuizIcon from "@mui/icons-material/Quiz";
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const audio = (variable) => {
  new Audio(variable).play();
};
const style = {
  position: "static",
  marginInline: "auto",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "2rem",
  //   borderRadius: "20px",
  whiteSpace: "pre-line",
  paddingBottom: "3rem",
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#272727" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      question: "",
      answer: "",
      flashcards: [],
      open: false,
      i: 1,
      show: false,
      openSelfAssesment: false,
      matches: window.matchMedia("(max-width: 1224px)").matches,
    };
  }
  componentDidMount() {
    const handler = (e) => this.setState({ matches: e.matches });
    window
      .matchMedia("(max-width: 1224px)")
      .addEventListener("change", handler);
  }
  next = () => {
    this.setState({ show: false });
    if (this.state.currentSlide == this.state.flashcards.length) {
      this.setState((state) => ({
        currentSlide: 0,
      }));
    }
    this.setState((state) => ({
      currentSlide: state.currentSlide + 1,
    }));
  };

  prev = () => {
    this.setState({ show: false });
    if (this.state.currentSlide == 1) {
      this.setState((state) => ({
        currentSlide: this.state.flashcards.length,
      }));
    } else {
      this.setState((state) => ({
        currentSlide: state.currentSlide - 1,
      }));
    }
  };
  changeAutoPlay = () => {
    this.setState((state) => ({
      autoPlay: !state.autoPlay,
    }));
  };
  render() {
    const handleClose = () => this.setState({ open: false });

    if (this.state.i == 1) {
      if (window.localStorage.getItem("flashcards")) {
        this.setState({
          flashcards: JSON.parse(window.localStorage.getItem("flashcards")),
        });
      }
      this.setState({ i: 2 });
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography color="primary" variant="button">
          Learn faster
        </Typography>

        <TextField
          onChange={(e) => {
            this.setState({ question: e.target.value });
          }}
          label="Question"
          multiline
        />

        <TextField
          onChange={(e) => {
            this.setState({ answer: e.target.value });
          }}
          label="Answer"
          minRows={4}
          multiline
          maxRows={10}
        />

        <div
          style={
            !this.state.matches
              ? { display: "flex", justifyContent: "space-evenly" }
              : {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "80%",
                  marginInline: "auto",
                }
          }
        >
          <Button
            onClick={() => {
              audio(clickAudio);
              this.state.flashcards.push({
                question: this.state.question,
                answer: this.state.answer,
              });

              window.localStorage.setItem(
                "flashcards",
                JSON.stringify(this.state.flashcards)
              );
              this.setState({ i: 2 });
            }}
            startIcon={<AddIcon />}
            variant="contained"
            style={{ paddingInline: "1rem" }}
          >
            Add Flashcard
          </Button>
          <Button
            onClick={() => {
              this.setState({ open: true });
            }}
            startIcon={<SlideshowIcon />}
            variant="contained"
            style={{ paddingInline: "1rem" }}
          >
            Start reading
          </Button>
          <Button
            onClick={() => {
              this.setState({ openSelfAssesment: true });
            }}
            startIcon={<QuizIcon />}
            variant="contained"
            style={{ paddingInline: "1rem" }}
          >
            Start Self assessment
          </Button>
        </div>
        <Typography variant="button" color="primary">
          Questions :{" "}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {this.state.flashcards.map((val, key) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={key}>
                <Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography variant="button">{val.question}</Typography>
                    {/* <Typography>{val.answer}</Typography> */}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        audio(deletedAudio);
                        this.setState({
                          flashcards: this.state.flashcards.splice(key, 1),
                        });
                        window.localStorage.setItem(
                          "flashcards",
                          JSON.stringify(this.state.flashcards)
                        );
                        this.setState({
                          flashcards: JSON.parse(
                            window.localStorage.getItem("flashcards")
                          ),
                        });
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </Item>
              </Grid>
            );
          })}
          <Modal
            style={{ overflow: "scroll" }}
            open={this.state.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Fade in={this.state.open}>
              <Box sx={style}>
                <div style={{ display: "flex", gap: "2rem" }}>
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
                </div>

                {/* Content */}
                <Carousel
                  showIndicators={false}
                  showStatus={false}
                  // centerMode
                  dynamicHeight
                  infiniteLoop
                  emulateTouch
                  swipeable
                  useKeyboardArrows
                  style={{ paddgin: "2rem" }}
                >
                  {this.state.flashcards.map((val, key) => {
                    return (
                      <div>
                        <div style={{ display: "flex" }}>
                          <Button
                            style={{
                              marginTop: "1rem",
                              marginBottom: "1rem",
                              // width: "7rem",
                            }}
                            variant="contained"
                            color="error"
                            onClick={() => {
                              audio(deletedAudio);
                              this.setState({
                                flashcards: this.state.flashcards.splice(
                                  key,
                                  1
                                ),
                              });
                              window.localStorage.setItem(
                                "flashcards",
                                JSON.stringify(this.state.flashcards)
                              );
                              this.setState({
                                flashcards: JSON.parse(
                                  window.localStorage.getItem("flashcards")
                                ),
                              });
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                        <Typography variant="h6">{val.question}</Typography>
                        <Typography style={{ marginTop: "1rem" }}>
                          {val.answer}
                        </Typography>
                      </div>
                    );
                  })}
                </Carousel>
                {/* Content Over */}
              </Box>
            </Fade>
          </Modal>

          {/* SELF ASSESMENT */}

          <Modal
            style={{ overflow: "scroll" }}
            open={this.state.openSelfAssesment}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Fade in={this.state.openSelfAssesment}>
              <Box sx={style}>
                <div style={{ display: "flex", gap: "2rem" }}>
                  <Button
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      // width: "7rem",
                    }}
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      this.setState({ openSelfAssesment: false });
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",

                    marginBottom: "1rem",
                  }}
                >
                  <Button variant="contained" onClick={this.prev}>
                    <NavigateBeforeIcon />
                    Previous
                  </Button>

                  <Button variant="contained" onClick={this.next}>
                    Next
                    <NavigateNextIcon />
                  </Button>
                </div>

                {/* Content */}
                <Carousel
                  showIndicators={false}
                  showStatus={false}
                  // centerMode
                  dynamicHeight
                  showArrows={false}
                  infiniteLoop
                  // emulateTouch
                  selectedItem={this.state.currentSlide}
                  onChange={this.updateCurrentSlide}
                  // swipeable
                  useKeyboardArrows
                  style={{ paddgin: "2rem" }}
                >
                  {this.state.flashcards.map((val, key) => {
                    return (
                      <div style={{ minHeight: "120vh" }}>
                        <Typography variant="h6">{val.question}</Typography>
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            marginTop: "1rem",
                            paddingInline: "1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2rem",
                              marginTop: "1rem",
                              marginRight: "auto",
                              flex: "0.5",
                            }}
                          >
                            <TextField
                              fullWidth
                              multiline
                              label="Type your answer here"
                              minRows={6}
                            />
                            <Button
                              onClick={() => {
                                this.setState({ show: false });
                              }}
                              style={
                                this.state.show
                                  ? { alignSelf: "flex-end" }
                                  : { display: "none" }
                              }
                              color="warning"
                              variant="contained"
                            >
                              <VisibilityOffRoundedIcon />
                              Hide Answer
                            </Button>
                          </div>
                          <Button
                            onClick={() => {
                              this.setState({
                                show: "true",
                              });
                              this.setState({ openSelfAssesment: true });
                            }}
                            style={
                              !this.state.show
                                ? {
                                    marginTop: "1rem",
                                    alignSelf: "flex-start",
                                  }
                                : { display: "none" }
                            }
                            variant="contained"
                          >
                            <VisibilityRoundedIcon />
                            Show answer
                          </Button>
                          <Typography
                            style={
                              this.state.show
                                ? {
                                    marginTop: "1rem",
                                    flex: "0.5",
                                  }
                                : { display: "none" }
                            }
                          >
                            {val.answer}
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
                {/* Content Over */}
              </Box>
            </Fade>
          </Modal>
        </Grid>
      </div>
    );
  }
}
