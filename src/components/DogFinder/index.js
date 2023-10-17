
import React, { useState } from "react";
import {
  Container,
  Grid,
  TablePagination,
  Paper,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { DogFilterer } from "./DogFilterer";
import { SortFields, SortModes, DogSorter } from "./DogSorter";
import { createEventTargetValueExtractor } from "utils";
import { DogResults } from "./DogResults";
import { useRequest } from "hooks/useRequest";
import { DogAgeRangeSelector, DogAgeRangeLimits } from "./DogAgeSelector";
import { FavoriteDogs } from "./FavoriteDogs";
import { useConfig } from "base-shell/lib/providers/Config";

const DEFAULT_DOGS_PER_PAGE = 24;

/**
 * A component that displays a list of dogs that can be filtered, sorted, and paginated.
 */
const DogFinderView = () => {
  const { appConfig } = useConfig()

  const [favoriteDogIds, setFavoriteDogIds] = useState(new Set());
  const [breeds, setBreeds] = useState(null); // Should be an array, but the search endpoint doesn't support multiple breeds from my testing
  const [sortBy, setSortBy] = useState(SortFields.BREED);
  const [sortMode, setSortMode] = useState(SortModes.ASC);
  const [currentPage, setCurrentPage] = useState(0);
  const [dogsPerPage, setDogsPerPage] = useState(DEFAULT_DOGS_PER_PAGE);
  const [ageRange, setAgeRange] = useState({ ageMin: DogAgeRangeLimits.MIN, ageMax: DogAgeRangeLimits.MAX });

  const { data: dogSearchResults, loading } = useRequest(appConfig.api.dogSearch, { next: undefined, resultIds: [], total: 0 }, {
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

  const isFavoriteDog = (dog) => favoriteDogIds.has(dog.id);

  const handleToggleFavoriteDog = (dog) => {
    const favoriteDogsCopy = new Set(favoriteDogIds)
    if (isFavoriteDog(dog)) {
      favoriteDogsCopy.delete(dog.id)
    } else {
      favoriteDogsCopy.add(dog.id);
    }
    setFavoriteDogIds(favoriteDogsCopy)
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
                <Divider />
                <FavoriteDogs favoriteDogIds={favoriteDogIds} onRemoveFavoriteDog={handleToggleFavoriteDog} />
              </Stack>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                {
                  (loading && dogSearchResults.resultIds.length === 0) ? (
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: 5 }}>
                      <CircularProgress />
                    </Container>
                  ) :
                    <DogResults dogIds={dogSearchResults.resultIds} isFavoriteDog={isFavoriteDog} onToggleFavoriteDog={handleToggleFavoriteDog} />
                }
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
              rowsPerPageOptions={[12, DEFAULT_DOGS_PER_PAGE, 48, 96]}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DogFinderView;