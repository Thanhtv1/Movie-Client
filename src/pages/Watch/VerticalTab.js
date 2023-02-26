import React, { memo, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
import { useSelector } from "react-redux";
import { selectDetails } from "../../redux/Slices/Detail";

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
        <Box>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(11),
    "&.Mui-selected": {
      color: "#000",
      fontSize: "1rem",
      fontWeight: "700",
    },
  })
);

function VerticalTab() {
  const detailData = useSelector(selectDetails);
  const { seasons } = detailData;
  const isHasSeason0 = seasons?.some(({ name }) => name === "Specials");
  // console.log(isHasSeason0);
  const { season, episode } = useQueryString();
  const [indexSeason, setIndexSeason] = useState(Number(season));
  const [_, setQueryParams] = useSearchParams();
  const [isActive, setIsActive] = useState(() => {
    if (episode - 1) {
      return episode - 1;
    }
    return 0;
  });
  let [value, setValue] = useState(
    isHasSeason0 && seasons?.length > 0
      ? Number(season)
      : season === 0
      ? Number(season - 1)
      : 0
  );
  // console.log(value);
  useEffect(() => {
    const isValidEpisode = seasons?.find(
      ({ season_number }) => season_number === Number(season)
    );
    if (
      isValidEpisode?.episode_count < Number(episode) ||
      isNaN(Number(episode))
    ) {
      setIsActive(0);
      setQueryParams({
        season: 1,
        episode: 1,
      });
      return;
    }
    if (season > seasons?.length || isNaN(Number(season))) {
      setIsActive(0);
      setQueryParams({
        season: 1,
        episode: 1,
      });
      return;
    }
    if (isHasSeason0) {
      if (Number(season) === 0) {
        setValue(0);
      } else {
        setValue(Number(season));
      }
    }
    if (!isHasSeason0 && seasons?.length > 0) {
      setValue(season - 1);
    }
  }, [season, episode, seasons?.length, isHasSeason0]);

  const handleEpisodesClick = (e_number) => {
    if (e_number == episode) {
      return;
    }
    setIsActive(e_number - 1);
    setQueryParams({
      season: indexSeason,
      episode: `${e_number}`,
    });
  };

  const handledleSeasonsClick = (s_number) => {
    setIndexSeason(s_number);
    setIsActive(null);
    if (s_number == season) {
      setIsActive(episode - 1);
    }
    if (s_number == season) {
      return;
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        overflow: "hidden",
        overflowY: "scroll",
        height: 300,
      }}
    >
      {seasons?.length !== 0 && (
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs of seasons"
          sx={{
            color: "textPrimary",
            borderRight: 1,
            borderColor: "divider",
            width: "120px",
            flexShrink: 0,
          }}
        >
          {seasons?.map(({ name, season_number, poster_path, id }) => (
            <StyledTab
              onClick={() => handledleSeasonsClick(season_number)}
              key={id}
              label={name}
            ></StyledTab>
          ))}
        </Tabs>
      )}
      {seasons?.map((season, i) => (
        <TabPanel key={i} value={value} index={i}>
          <div className="flex px-2 grow flex-wrap">
            {Array.from(Array(season.episode_count).keys())?.map((ep, i) => {
              const exactEpisode = Number(ep + 1);
              return (
                <button
                  key={i}
                  onClick={() => handleEpisodesClick(exactEpisode)}
                  className={`w-12 m-1.5 p-1 cursor-pointer rounded-lg text-center font-semibold transition ${
                    isActive == i++
                      ? "bg-[#3db4f2] text-[#ffffff]"
                      : "bg-[#dde6ee] text-[#516170] hover:scale-105 hover:bg-opacity-70"
                  }  `}
                >
                  {exactEpisode}
                </button>
              );
            })}
          </div>
        </TabPanel>
      ))}
    </Box>
  );
}

export default memo(VerticalTab);
