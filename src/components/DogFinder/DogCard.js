import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { getDogImgAltText } from "./utils";

/**
 *
 * @param {Object} props
 * @param {string[]} props.dog
 * @param {boolean} props.isFavoriteDog - Tells if a dog is in the favorites list.
 * @param {function} props.onToggleFavoriteDog - A function to toggle (set or unset) a favorite dog.
 * @returns {JSX.Element} - React component representing a DogCard with dog information.
 */
export const DogCard = ({ dog, isFavoriteDog, onToggleFavoriteDog }) => {
  return (
    <Card elevation={4}>
      <CardMedia image={dog.img} title={getDogImgAltText(dog)} sx={{ height: 200 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" color="secondary" fontWeight="bold">
          {dog.name}
        </Typography>
        <Typography variant="body1">Breed: <b>{dog.breed}</b></Typography>
        <Typography variant="body1">Age: <b>{dog.age}</b></Typography>
        <Typography variant="body1">Zip Code: <b>{dog.zip_code}</b></Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth endIcon={isFavoriteDog ? <HeartBrokenIcon /> : <FavoriteIcon />} size="small" variant="contained" color={isFavoriteDog ? "secondary" : "primary"} onClick={() => onToggleFavoriteDog(dog)}>{isFavoriteDog ? "Remove" : "Add"}</Button>
      </CardActions>

    </Card>
  );
};
