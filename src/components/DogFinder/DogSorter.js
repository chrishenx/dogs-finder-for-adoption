import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useIntl } from "react-intl";

import { createEventTargetValueExtractor } from "utils";

export const SortFields = {
  BREED: "breed",
  NAME: "Name",
  AGE: "Age",
  ZIP_CODE: "Zip code",
};

export const SortModes = {
  DESC: "desc",
  ASC: "asc"
};

/**
 * A component that allows the user to sort a list of dogs by breed, name or age.
 *
 * @param {Object} props - The component props.
 * @param {string} props.sortBy - The current sort criteria.
 * @param {string} props.sortMode - The current sort mode (either "asc" or "desc").
 * @param {Function} props.onSortByChange - A callback function to be called when the sort criteria changes.
 * @param {Function} props.onSortModeChange - A callback function to be called when the sort mode changes.
 */
export const DogSorter = ({
  sortBy, sortMode, onSortByChange, onSortModeChange 
}) => {
  const isDescSortMode = sortMode === SortModes.DESC;
  const intl = useIntl();

  const handleSortByChange = createEventTargetValueExtractor(onSortByChange);
  const toggleSortMode = () => onSortModeChange(isDescSortMode ? SortModes.ASC : SortModes.DESC);

  return (
    <Grid container >
      <Grid item xs={9}>
        <FormControl fullWidth>
          <InputLabel>{intl.formatMessage({ id: "components.dogSorter.label" })}</InputLabel>
          <Select
            label={intl.formatMessage({ id: "components.dogSorter.label" })}
            value={sortBy}
            onChange={handleSortByChange}
          >
            <MenuItem value="breed">{intl.formatMessage({ id: "components.dogSorter.sortBy.breed" })}</MenuItem>
            <MenuItem value="name">{intl.formatMessage({ id: "components.dogSorter.sortBy.name" })}</MenuItem>
            <MenuItem value="age">{intl.formatMessage({ id: "components.dogSorter.sortBy.age" })}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}><div></div></Grid>
      <Grid item xs={2}>
        <Tooltip 
          arrow
          placement="top"
          title={isDescSortMode ? 
            intl.formatMessage({ id: "components.dogSorter.tooltipSetAscMode" }) 
            : 
            intl.formatMessage({ id: "components.dogSorter.tooltipSetDescMode" })
          }>
          <IconButton onClick={toggleSortMode}>
            {
              isDescSortMode ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />
            }
          </IconButton>
        </Tooltip>
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
