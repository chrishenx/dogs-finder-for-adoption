
import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TablePagination,
} from "@mui/material";
import { useConfig } from "base-shell/lib/providers/Config";
import React, { useState } from "react";

import { DogAgeRangeLimits, DogAgeRangeSelector } from "./DogAgeSelector";
import { DogFilterer } from "./DogFilterer";
import { DogResults } from "./DogResults";
import {
  DogSorter, SortFields, SortModes 
} from "./DogSorter";
import { FavoriteDogs } from "./FavoriteDogs";

import { useRequest } from "hooks/useRequest";
import { createEventTargetValueExtractor } from "utils";



const DEFAULT_DOGS_PER_PAGE = 24;

/**
 * A component that displays a list of dogs that can be filtered, sorted, and paginated.
 */
const DogFinderView = () => {
  const { appConfig } = useConfig();

  const [favoriteDogIds, setFavoriteDogIds] = useState(new Set());
  const [breeds, setBreeds] = useState(null); // Should be an array, but the search endpoint doesn't support multiple breeds from my testing
  const [sortBy, setSortBy] = useState(SortFields.BREED);
  const [sortMode, setSortMode] = useState(SortModes.ASC);
  const [currentPage, setCurrentPage] = useState(0);
  const [dogsPerPage, setDogsPerPage] = useState(DEFAULT_DOGS_PER_PAGE);
  const [ageRange, setAgeRange] = useState({ ageMin: DogAgeRangeLimits.MIN, ageMax: DogAgeRangeLimits.MAX });

  const { data: dogSearchResults, loading } = useRequest(appConfig.api.dogSearch, {
    next: undefined, resultIds: [], total: 0 
  }, {
    search: {
      from: currentPage * dogsPerPage,
      size: dogsPerPage,
      sort: `${sortBy}:${sortMode}`,
      ...(breeds?.length ? { breeds } : {}),
      ...ageRange
    }
  });

  const handleChangeRowsPerPage = createEventTargetValueExtractor(value => {
    setDogsPerPage(Number.parseInt(value));
    setCurrentPage(0);
  });

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const isFavoriteDog = (dog) => favoriteDogIds.has(dog.id);

  const handleToggleFavoriteDog = (dog) => {
    const favoriteDogsCopy = new Set(favoriteDogIds);
    if (isFavoriteDog(dog)) {
      favoriteDogsCopy.delete(dog.id);
    } else {
      favoriteDogsCopy.add(dog.id);
    }
    setFavoriteDogIds(favoriteDogsCopy);
  };

  return (
    <Container maxWidth="xl"
      sx={{
        width: "100%", paddingTop: "1em", paddingBottom: "1em" 
      }}>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Grid container columnSpacing={2}>
            <Grid item
              md={3}
              sm={4}
              xs={5}>
              <Stack spacing={5}>
                <DogFilterer selectedBreeds={breeds} onSelectedBreedsChanged={setBreeds} />
                <DogAgeRangeSelector ageRange={ageRange} onAgeRangeChanged={setAgeRange} />
                <DogSorter sortBy={sortBy}
                  sortMode={sortMode}
                  onSortByChange={setSortBy}
                  onSortModeChange={setSortMode} />
                <Divider />
                <FavoriteDogs favoriteDogIds={favoriteDogIds} onRemoveFavoriteDog={handleToggleFavoriteDog} />
              </Stack>
            </Grid>
            <Grid item
              md={9}
              sm={8}
              xs={7}>
              <Grid container spacing={2}>
                {
                  (loading && dogSearchResults.resultIds.length === 0) ? (
                    <Container sx={{
                      display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: 5 
                    }}>
                      <CircularProgress />
                    </Container>
                  ) :
                    <DogResults 
                      dogIds={dogSearchResults.resultIds}
                      isFavoriteDog={isFavoriteDog}
                      onToggleFavoriteDog={handleToggleFavoriteDog} />
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item
          display="flex"
          justifyContent="flex-end"
          xs={12}>
          <Paper>
            <TablePagination
              count={Math.floor(dogSearchResults.total / dogsPerPage)}
              page={currentPage}
              rowsPerPage={dogsPerPage}
              rowsPerPageOptions={[12, DEFAULT_DOGS_PER_PAGE, 48, 96]}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DogFinderView;