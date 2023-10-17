import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { getDogImgAltText, intlBoldify } from "./utils";
import { useIntl } from "react-intl";


/**
 * A component that displays information about a dog, including its image, name, breed, age, and zip code.
 * Allows the user to add or remove the dog from their favorites list.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.dog - The dog object containing information about the dog.
 * @param {boolean} props.isFavoriteDog - A boolean indicating whether the dog is in the user's favorites list.
 * @param {Function} props.onToggleFavoriteDog - A function to toggle the dog's favorite status.
 */
export const DogCard = ({ dog, isFavoriteDog, onToggleFavoriteDog }) => {
  const intl = useIntl()
  return (
    <Card elevation={3}>
      <CardMedia image={dog.img} title={getDogImgAltText(dog)} sx={{ height: 200 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color={isFavoriteDog ? "primary" : "secondary"} fontWeight="bold">
          {dog.name}
          {isFavoriteDog && " ❤️"}
        </Typography>
        <Typography variant="body1">{intl.formatMessage({ id: 'components.dogCard.content.breed' }, { b: intlBoldify, breed: dog.breed })}</Typography>
        <Typography variant="body1">{intl.formatMessage({ id: 'components.dogCard.content.age' }, { b: intlBoldify, age: dog.age })}</Typography>
        <Typography variant="body1">{intl.formatMessage({ id: 'components.dogCard.content.zipCode' }, { b: intlBoldify, zipCode: dog.zip_code })}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth endIcon={isFavoriteDog ? <HeartBrokenIcon /> : <FavoriteIcon />} size="small" variant="contained" color={isFavoriteDog ? "secondary" : "primary"} onClick={() => onToggleFavoriteDog(dog)}>
          {isFavoriteDog ?
            intl.formatMessage({ id: 'components.dogCard.actions.remove' })
            :
            intl.formatMessage({ id: 'components.dogCard.actions.add' })
          }
        </Button>
      </CardActions>
    </Card>
  );
};

DogCard.propTypes = {
  dog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    zip_code: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  isFavoriteDog: PropTypes.bool.isRequired,
  onToggleFavoriteDog: PropTypes.func.isRequired,
};
