import { useRequest } from "hooks/useRequest";
import PropTypes from 'prop-types';

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
export const DogResults = ({ dogIds, isFavoriteDog, onToggleFavoriteDog }) => {
  const { data: dogs, loading } = useRequest('/dogs', [], { method: 'POST', body: dogIds });

  return <>
    {dogs.map((dog) => (
      <Grid item key={dog.id} xs={3}>
        <DogCard dog={dog} isFavoriteDog={isFavoriteDog(dog)} onToggleFavoriteDog={onToggleFavoriteDog} />
      </Grid>
    ))}
  </>
}

DogResults.propTypes = {
  dogIds: PropTypes.array.isRequired,
  isFavoriteDog: PropTypes.func.isRequired,
  onToggleFavoriteDog: PropTypes.func.isRequired,
};