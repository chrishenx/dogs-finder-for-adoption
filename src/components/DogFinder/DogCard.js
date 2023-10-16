import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

/**
 *
 * @param {Object} props
 * @param {string[]} props.dogIds - An array of dog IDs to fetch and display.
 * @param {boolean} props.isFavoriteDog - Tells if a dog is in the favorites list.
 * @param {function} props.onToggleFavoriteDog - A function to toggle (set or unset) a favorite dog.
 * @returns {JSX.Element} - React component representing a DogCard with dog information.
 */
export const DogCard = ({ dog, isFavoriteDog, onToggleFavoriteDog }) => {
  const altText = `Image of a ${dog.breed} dog, ${dog.age} years old, named ${dog.name}`
  return (
    <Card elevation={5}>
      <CardMedia image={dog.img} title={altText} sx={{ height: 200 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary" fontWeight="bold">
          {dog.name}
        </Typography>
        <Typography variant="body1"><b>Breed:</b>{dog.breed}.</Typography>
        <Typography variant="body1"><b>Age:</b>{dog.age}.</Typography>
        <Typography variant="body1"><b></b>Zip Code: <b>{dog.zip_code}</b></Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth endIcon={isFavoriteDog ? <HeartBrokenIcon /> : <FavoriteIcon />} size="small" variant="contained" color={isFavoriteDog ? "secondary" : "primary"} onClick={() => onToggleFavoriteDog(dog)}>{isFavoriteDog ? "Remove" : "Add"}</Button>
      </CardActions>
    </Card>
  );
};
