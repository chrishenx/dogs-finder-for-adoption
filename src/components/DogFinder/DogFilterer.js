import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";
import { useConfig } from "base-shell/lib/providers/Config";
import { useRequest } from "hooks/useRequest";

const DogFilterer = ({ selectedBreeds, onSelectedBreedsChanged }) => {
  const { appConfig } = useConfig()
  const { data: breeds, loading } = useRequest('/dogs/breeds', [])

  const handleBreedSelectionChanged = (_, newSelectedBreeds) => onSelectedBreedsChanged(newSelectedBreeds);

  return (
    <Autocomplete
      options={breeds}
      value={selectedBreeds}
      onChange={handleBreedSelectionChanged}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Select your breed" /* TODO Replace with Intl keys */
          placeholder="Breeds"
        />
      )}
    />
  );
};

export default DogFilterer;
