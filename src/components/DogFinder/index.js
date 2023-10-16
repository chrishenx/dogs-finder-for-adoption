
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TablePagination,
  Paper,
  Stack,
} from "@mui/material";
import DogFilterer from "./DogFilterer";
import { useConfig } from "base-shell/lib/providers/Config";
import DogSorter, { SortFields, SortModes } from "./DogSorter";
import { createEventTargetValueExtractor } from "utils";
import { DogResults } from "./DogResults";
import { useRequest } from "hooks/useRequest";
import DogAgeRangeSelector, { DogAgeRangeLimits } from "./DogAgeSelector";

const DEFAULT_DOGS_PER_PAGE = 25;

const DogFinderView = () => {
  const { appConfig } = useConfig()

  const [favoriteDogs, setFavoriteDogs] = useState(new Set());

  const [breeds, setBreeds] = useState([]);
  const [sortBy, setSortBy] = useState(SortFields.BREED);
  const [sortMode, setSortMode] = useState(SortModes.ASC);
  const [currentPage, setCurrentPage] = useState(0);
  const [dogsPerPage, setDogsPerPage] = useState(DEFAULT_DOGS_PER_PAGE);
  const [ageRange, setAgeRange] = useState({ ageMin: DogAgeRangeLimits.MIN, ageMax: DogAgeRangeLimits.MAX });

  const { data: dogSearchResults, loading } = useRequest('/dogs/search', { next: undefined, resultIds: [], total: 0 }, {
    search: {
      from: currentPage * dogsPerPage,
      size: dogsPerPage,
      sort: `${sortBy}:${sortMode}`,
      ...(breeds?.length ? { breeds } : {}),
      ...ageRange
    }
  })

  const handleChangeRowsPerPage = createEventTargetValueExtractor(value => {
    setDogsPerPage(Number.parseInt(value))
    setCurrentPage(0);
  })

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const isFavoriteDog = (dog) => favoriteDogs.has(dog.id);

  const handleToggleFavoriteDog = (dog) => {
    const favoriteDogsCopy = new Set(favoriteDogs)
    if (isFavoriteDog(dog)) {
      favoriteDogsCopy.delete(dog.id)
    } else {
      favoriteDogsCopy.add(dog.id);
    }
    setFavoriteDogs(favoriteDogsCopy)
  }

  return (
    <Container maxWidth="xl" sx={{ width: '100%', paddingTop: "1em", paddingBottom: "1em" }}>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Grid container columnSpacing={2}>
            <Grid item xs={3}>
              <Stack spacing={5}>
                <DogFilterer selectedBreeds={breeds} onSelectedBreedsChanged={setBreeds} />
                <DogAgeRangeSelector ageRange={ageRange} onAgeRangeChanged={setAgeRange} />
                <DogSorter sortBy={sortBy} sortMode={sortMode} onSortByChange={setSortBy} onSortModeChange={setSortMode} />
              </Stack>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <DogResults dogIds={dogSearchResults.resultIds} isFavoriteDog={isFavoriteDog} onToggleFavoriteDog={handleToggleFavoriteDog} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Paper>
            <TablePagination
              page={currentPage}
              count={Math.floor(dogSearchResults.total / dogsPerPage)}
              rowsPerPage={dogsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handlePageChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DogFinderView;