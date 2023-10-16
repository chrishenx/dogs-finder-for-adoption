import React from "react";
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
} from "@mui/material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { createEventTargetValueExtractor } from "utils";

export const SortFields = {
  BREED: "breed",
  NAME: "Name",
  AGE: "Age",
  ZIP_CODE: "Zip code",
}

export const SortModes = {
  DESC: "desc",
  ASC: "asc"
}

const DogSorter = ({ sortBy, sortMode, onSortByChange, onSortModeChange }) => {
  const isDescSortMode = sortMode === SortModes.DESC;

  const handleSortByChange = createEventTargetValueExtractor(onSortByChange)
  const toggleSortMode = () => onSortModeChange(isDescSortMode ? SortModes.ASC : SortModes.DESC)

  return (
    <Grid container >
      <Grid item xs={9}>
        <FormControl fullWidth>
          <InputLabel>Sort by:</InputLabel>
          <Select
            label="Sort dogs by" /* TODO Change with Intl key */
            value={sortBy}
            onChange={handleSortByChange}
          /* MenuProps={{ slotProps: { paper: { style } } }} */
          >
            <MenuItem value="breed">Breed</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="age">Age</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}><div></div></Grid>
      <Grid item xs={2}>
        <IconButton onClick={toggleSortMode} aria-label={isDescSortMode ? "Set ascending sort mode" : "Set descending sort mode"}>
          {
            isDescSortMode ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />
          }
        </IconButton>
      </Grid>
    </Grid>
  );
};


DogSorter.propTypes = {
  sortBy: PropTypes.oneOf(["breed", "name", "age"]).isRequired,
  onSortByChange: PropTypes.func.isRequired,
  sortMode: PropTypes.oneOf(Object.values(SortModes)).isRequired,
  onSortModeChange: PropTypes.func.isRequired,
};

DogSorter.defaultProps = {
  sortBy: SortFields.BREED,
  sortMode: SortModes.DESC,
};

export default DogSorter;
