/*
Give me a React component that receives a list of favoriteDogs, each one with id, name and img. Put them in a Material UI List.
*/
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import {
  Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip, Typography 
} from "@mui/material";
import { useConfig } from "base-shell/lib/providers/Config";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { getDogImgAltText } from "../utils";

import DogMatcher from "./DogMatcher";

import { useRequest } from "hooks/useRequest";

/**
 * @param {Object} props
 * @param {Set} props.favoriteDogIds - A set of favorite dog ids.
 * @param {function} props.onRemoveFavoriteDog - A function to remove a favorite dog.
 */
export const FavoriteDogs = ({ favoriteDogIds, onRemoveFavoriteDog }) => {
  const { appConfig } = useConfig();
  const intl = useIntl();
  const { data: favoriteDogs } = useRequest(
    appConfig.api.dogDetails, 
    [], 
    { method: "POST", body: [...favoriteDogIds] }
  );

  return (
    <Box>
      <Typography component="h2" variant="h6">{intl.formatMessage({ id: "components.favoriteDogs.title" })}</Typography>
      {
        favoriteDogIds.size === 0 ?
          <Typography gutterBottom
            component="p"
            fontSize="1.1em"
            variant="caption">
            {intl.formatMessage({ id: "components.favoriteDogs.empty" })}
          </Typography>
          :
          <List sx={{ bgcolor: "background.paper" }}>
            {favoriteDogs.map((dog) => (
              <ListItem key={dog.id}>
                <ListItemAvatar>
                  <Avatar alt={getDogImgAltText(dog)} src={dog.img} sx={{ height: 50, width: 50 }} />
                </ListItemAvatar>
                <ListItemText primary={dog.name} secondary={dog.breed} sx={{ marginLeft: 1 }} />
                <ListItemSecondaryAction>
                  <Tooltip arrow
                    placement="top"
                    title={
                      intl.formatMessage(
                        { id: "components.favoriteDogs.tooltipRemoveFromFavorites" }, { dogName: dog.name }
                      )
                    }>
                    <IconButton color="secondary" edge="end" onClick={() => onRemoveFavoriteDog(dog)}>
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
};

FavoriteDogs.propTypes = {
  favoriteDogIds: PropTypes.instanceOf(Set).isRequired,
  onRemoveFavoriteDog: PropTypes.func.isRequired,
};
