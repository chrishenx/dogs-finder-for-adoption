import React from "react";
import { Slider, Stack } from "@mui/material";
import PropTypes from "prop-types";

export const DogAgeRangeLimits = {
  MIN: 0,
  MAX: 20,
}

export const DogAgeRangeSelector = ({ ageRange, onAgeRangeChanged }) => {
  const handleAgeRangeChange = (_, newValue) => {
    onAgeRangeChanged({ageMin: newValue[0], ageMax: newValue[1]})
  };

  return (
    <Stack spacing={1}>
      <label>Rango de edad:</label> {/* TODO Change with Intl key */}
      <Slider
        min={DogAgeRangeLimits.MIN}
        max={DogAgeRangeLimits.MAX}
        value={[ageRange.ageMin, ageRange.ageMax]}
        onChange={handleAgeRangeChange}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
};

DogAgeRangeSelector.propTypes = {
  ageRange: PropTypes.shape({
    ageMin: PropTypes.number.isRequired,
    ageMax: PropTypes.number.isRequired,
  }).isRequired,
  onAgeRangeChanged: PropTypes.func.isRequired,
};

export default DogAgeRangeSelector;
