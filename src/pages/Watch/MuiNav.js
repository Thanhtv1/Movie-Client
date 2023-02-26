import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import VerticalTab from "./VerticalTab";
import Cast from "../Detail/Cast";
import { selectDetails } from "../../redux/Slices/Detail";
import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography component="span">{children}</Typography>
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export default function MuiNav() {
  const { type } = useParams();
  // console.log(type, id);
  const [value, setValue] = useState(0);
  const detailData = useSelector(selectDetails);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="">
          {type === "tv" && <Tab label="Episodes" />}
          <Tab label="Information" />
          <Tab label="Cast" />
        </Tabs>
      </Box>

      {type === "tv" && (
        <TabPanel value={value} index={0}>
          <VerticalTab />
        </TabPanel>
      )}
      <TabPanel value={value} index={type !== "tv" ? 0 : 1}>
        <div className="w-full px-3 lg:px-5 py-2">
          <p className="text-xl font-medium">Overview</p>
          <div className="flex flex-col lg:flex-row lg:space-x-8 mt-4">
            <p className="lg:w-[45%] text-gray-800 text-sm shrink-0 text-clip">
              {detailData?.overview || "Currently Unavailable"}
            </p>
            <div className="grow flex flex-col mt-4 border-t lg:border-0 lg:mt-0 border-gray-500 space-y-2.5 lg:space-y-1.5 w-full text-sm">
              <h2 className="pt-2 lg:pt-0">
                Production Companies:
                {detailData?.production_companies?.map((c, i) => (
                  <span key={c.id} className={`${i === 0 ? "pl-1.5" : ""}`}>
                    {(i ? ", " : "") + c.name}
                  </span>
                ))}
              </h2>
              <h2>
                Production Countries:
                {detailData?.production_countries?.map((c, i) => (
                  <span key={i} className={`${i === 0 ? "pl-1.5" : ""} `}>
                    {(i ? ", " : "") + c.name}
                  </span>
                ))}
              </h2>
              <p>
                Release Date :{" "}
                {detailData?.release_date || detailData?.first_air_date}
              </p>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel
        sx={{ overflow: "hidden", overflowY: "scroll" }}
        value={value}
        index={type !== "tv" ? 1 : 2}
      >
        <Cast css="px-3 lg:px-5" />
      </TabPanel>
    </Box>
  );
}
