import React, { memo } from "react";
import FormControl from "@mui/material/FormControl";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../redux/Slices/Film";

import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";
import useQueryString from "../../hooks/useQueryString";

function Sort() {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();
  const { sort } = useQueryString();
  const currentParams = useQueryString();
  const handleChange = (event) => {
    setSearchParams({
      ...currentParams,
      sort: event.target.value,
    });
    dispatch(removeAllItems());
  };

  return (
    <Box className="col-span-2" sx={{ Width: `full` }}>
      <h2 className="text-base font-semibold mb-3">Sort By</h2>
      <FormControl fullWidth>
        <NativeSelect
          disableUnderline
          className="bg-[#fbfbfb] border border-gray-300 rounded-md text-[#647380] p-1"
          value={sort || "popularity.desc"}
          onChange={handleChange}
        >
          <option value={"popularity.desc"}>Popular</option>
          <option value={"vote_count.desc"}>Rating</option>
          <option value={"release_date.desc"}>Recent</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
export default memo(Sort);
