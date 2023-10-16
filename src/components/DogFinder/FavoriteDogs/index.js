/*
Give me a React component that receives a list of favoriteDogs, each one with id, name and img. Put them in a Material UI List.
*/
import PropTypes from "prop-types";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from "@mui/material";
import { useRequest } from "hooks/useRequest";
import { getDogImgAltText } from "../utils";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DogMatcher from "./DogMatcher";

/**
 * @param {Object} props
 * @param {Set} props.favoriteDogIds - An set of favorite dog ids.
 * @param {function} props.onRemoveFavoriteDog - A function to remove a favorite dog.
 * @returns {JSX.Element} - React component representing the list of favorite dogs.
 */
export const FavoriteDogs = ({ favoriteDogIds, onRemoveFavoriteDog }) => {
  const { data: favoriteDogs, loading } = useRequest('/dogs', [], { method: 'POST', body: [...favoriteDogIds] })

  return (
    <Box>
      <Typography variant="h6" component="h2">Favorite Dogs</Typography>
      {
        favoriteDogIds.size === 0 ?
          <Typography variant="body1" component="p" gutterBottom>
            Add some goods to find you an amazing adoption match!
          </Typography>
          :
          <List sx={{ bgcolor: 'background.paper' }}>
            {favoriteDogs.map((dog) => (
              <ListItem key={dog.id}>
                <ListItemAvatar>
                  <Avatar alt={getDogImgAltText(dog)} src={dog.img} sx={{ height: 50, width: 50 }} />
                </ListItemAvatar>
                <ListItemText sx={{ marginLeft: 1 }} primary={dog.name} secondary={dog.breed} />
                <ListItemSecondaryAction>
                  <Tooltip title={`Remove ${dog.name} from favorites`} arrow placement="top">
                    <IconButton color="secondary" edge="end" aria-label="Remove value from favorites" onClick={() => onRemoveFavoriteDog(dog)}>
                      <HeartBrokenIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
      }
      {favoriteDogIds.size > 0 && <DogMatcher dogIds={favoriteDogIds} />}
    </Box>
  );
}

FavoriteDogs.propTypes = {
  favoriteDogIds: PropTypes.instanceOf(Set).isRequired,
  onRemoveFavoriteDog: PropTypes.func.isRequired,
};
