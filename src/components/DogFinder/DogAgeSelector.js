import { Slider, Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useIntl } from "react-intl";

export const DogAgeRangeLimits = {
  MIN: 0,
  MAX: 20,
};

/**
 * A component that allows the user to select a range of dog ages.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.ageRange - The current age range selected by the user.
 * @param {number} props.ageRange.ageMin - The minimum age in the range.
 * @param {number} props.ageRange.ageMax - The maximum age in the range.
 * @param {Function} props.onAgeRangeChanged - A callback function to be called when the age range changes.
 */
export const DogAgeRangeSelector = ({ ageRange, onAgeRangeChanged }) => {
  const intl = useIntl();

  const handleAgeRangeChange = (_, newValue) => {
    onAgeRangeChanged({ageMin: newValue[0], ageMax: newValue[1]});
  };

  return (
    <Stack spacing={1}>
      <label>
        {intl.formatMessage({ id: "components.dogAgeSelector.ageRange" })}
:
      </label>
      <Slider
        max={DogAgeRangeLimits.MAX}
        min={DogAgeRangeLimits.MIN}
        value={[ageRange.ageMin, ageRange.ageMax]}
        valueLabelDisplay="auto"
        onChange={handleAgeRangeChange}
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
