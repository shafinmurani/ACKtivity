import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Todo from "./sub-components/todo";
import Notes from "./sub-components/notes";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Body() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={
        {
          // flexGrow: 1,
          // bgcolor: "background.paper",
          // display: "flex",
          // minHeight: "100%",
        }
      }
    >
      <Tabs
        // orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
      >
        <Tab label="ToDo list" {...a11yProps(0)} />
        <Tab label="Notes" {...a11yProps(1)} />
        <Tab label="Flashcards" {...a11yProps(2)} />
        <Tab label="Music" {...a11yProps(3)} />
        <Tab label="Settings" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Todo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Notes />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </Box>
  );
}
