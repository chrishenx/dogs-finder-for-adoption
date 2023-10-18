import {
  Autocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useIntl } from "react-intl";

import { useRequest } from "hooks/useRequest";

/* I wasn't able to search dogs by multiple breeds so that's why I allowed a single value in this autocomplete */

/**
 * A component that filters dog breeds using an Autocomplete input.
 * @param {Object} props - The component props.
 * @param {Array} props.selectedBreeds - The currently selected dog breeds.
 * @param {Function} props.onSelectedBreedsChanged - A function to be called when the selected breeds change.
 * @returns {JSX.Element} - The DogFilterer component.
 */
export const DogFilterer = ({ selectedBreeds, onSelectedBreedsChanged }) => {
  const intl = useIntl();
  const { data: breeds, loading } = useRequest("/dogs/breeds", []);

  const handleBreedSelectionChanged = (_, newSelectedBreeds) => onSelectedBreedsChanged(newSelectedBreeds);

  return (
    loading || breeds.length === 0 ? (
      <CircularProgress />
    ) :
      <Autocomplete
        options={breeds}
        renderInput={params => (
          <TextField
            {...params}
            label={intl.formatMessage({ id: "components.dogFilterer.breedSelector.label" })}
            placeholder={intl.formatMessage({ id: "components.dogFilterer.breedSelector.placeholder" })}
            variant="standard"
          />
        )}
        value={selectedBreeds}
        onChange={handleBreedSelectionChanged}
      />
  );
};

DogFilterer.propTypes = {
  selectedBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectedBreedsChanged: PropTypes.func.isRequired,
};