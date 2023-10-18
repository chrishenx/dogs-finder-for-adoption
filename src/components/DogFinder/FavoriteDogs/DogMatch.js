// DogMatch component, receives a dogId as property, and fetches the dog from the API. It renders a Modal with the dog information.


// Path: src/components/DogFinder/FavoriteDogs/DogMatch.js
// Compare this snippet from src/components/DogFinder/DogResults.js:

import { useConfig } from "base-shell/lib/providers/Config";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { getDogImgAltText, intlBoldify } from "../utils";

import { useRequest } from "hooks/useRequest";

const {
  Typography, CircularProgress, Box, Card, CardMedia, CardContent, CardHeader 
} = require("@mui/material");


/**
 * A component that matches dogs based on their given dogId.
 *
 * @param {Object} props - The component props.
 * @param {string} props.dogId - The ID of the dog to match.
 */
export const DogMatch = ({ dogId }) => {
  const { appConfig } = useConfig();
  const { data: [dog], loading } = useRequest(appConfig.api.dogDetails, [{}], { method: "POST", body: [dogId] });
  const intl = useIntl();

  return <>
    {loading ? (
      <Box>
        <Typography component="h3" variant="h6">
          {intl.formatMessage({ id: "components.dogMatch.loading.title" })}
        </Typography>
        <CircularProgress />
      </Box>
    ) :
      <Card raised elevation={20}>
        <CardHeader sx={{
          textAlign: "center", bgcolor: "primary.main", fontWeight: "500" 
        }}
        title={
          <Typography color="white" component="h1" variant="h4">
            {intl.formatMessage({ id: "components.dogMatch.cardHeader" })}
          </Typography>}
        />
        <CardMedia image={dog.img} sx={{ height: 450 }} title={getDogImgAltText(dog)} />
        <CardContent>
          <Typography gutterBottom
            color="primary"
            component="h1"
            fontWeight="bold"
            variant="h3">
            {dog.name}
          </Typography>
          <Typography fontSize="1.2em" variant="body1">
            {intl.formatMessage({ id: "components.dogMatch.cardContent.dogDescription" }, {
              b: intlBoldify, breed: dog.breed, age: dog.age 
            })}
          </Typography>
          <Typography fontSize="1.1em" variant="body1">
            {intl.formatMessage(
              { id: "components.dogMatch.cardContent.zipCode" }, { b: intlBoldify, zipCode: dog.zip_code }
            )}
          </Typography>
        </CardContent>
      </Card>
    }
  </>;
};

DogMatch.propTypes = {dogId: PropTypes.string.isRequired,};
