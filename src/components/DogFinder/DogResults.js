import { useConfig } from "base-shell/lib/providers/Config";
import PropTypes from "prop-types";

import { useRequest } from "hooks/useRequest";

const { Grid } = require("@mui/material");

const { DogCard } = require("./DogCard");

/**
 *
 * @param {Object} props
 * @param {string[]} props.dogIds - An array of dog IDs to fetch and display.
 * @param {function} props.isFavoriteDog - A function that tells if a dog is in the favorites list.
 * @param {function} props.onToggleFavoriteDog - A function to toggle (set or unset) a favorite dog.
 * @returns {JSX.Element} - React component representing the list of dog cards.
 */
export const DogResults = ({
  dogIds, isFavoriteDog, onToggleFavoriteDog 
}) => {
  const { appConfig } = useConfig();
  const { data: dogs } = useRequest(appConfig.api.dogDetails, [], { method: "POST", body: dogIds });

  return <>
    {dogs.map((dog) => (
      // xs based on theme breakpoints
      <Grid key={dog.id}
        item
        lg={3}
        md={4}
        sm={6}
        xs={12}>
        <DogCard dog={dog} isFavoriteDog={isFavoriteDog(dog)} onToggleFavoriteDog={onToggleFavoriteDog} />
      </Grid>
    ))}
  </>;
};

DogResults.propTypes = {
  dogIds: PropTypes.array.isRequired,
  isFavoriteDog: PropTypes.func.isRequired,
  onToggleFavoriteDog: PropTypes.func.isRequired,
};