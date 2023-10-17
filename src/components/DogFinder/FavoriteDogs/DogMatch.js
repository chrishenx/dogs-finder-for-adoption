// DogMatch component, receives a dogId as property, and fetches the dog from the API. It renders a Modal with the dog information.


// Path: src/components/DogFinder/FavoriteDogs/DogMatch.js
// Compare this snippet from src/components/DogFinder/DogResults.js:

import { useRequest } from "hooks/useRequest";
import { getDogImgAltText, intlBoldify } from "../utils";
import PropTypes from 'prop-types';
import { useIntl } from "react-intl";

const { Typography, CircularProgress, Box, Card, CardMedia, CardContent, CardHeader } = require("@mui/material");


/**
 * A component that matches dogs based on their given dogId.
 *
 * @param {Object} props - The component props.
 * @param {string} props.dogId - The ID of the dog to match.
 */
export const DogMatch = ({ dogId }) => {
  const { data: [dog], loading } = useRequest(`/dogs`, [{}], { method: 'POST', body: [dogId] });
  const intl = useIntl()

  return <>
    {loading ? (
      <Box>
        <Typography variant="h6" component="h2">
          {intl.formatMessage({ id: 'components.dogMatch.loading.title' })}
        </Typography>
        <CircularProgress />
      </Box>
    ) :
      <Card elevation={20} raised>
        <CardHeader sx={{ textAlign: 'center', bgcolor: 'primary.main', fontWeight: "500" }}
          title={<Typography variant="h3" component="h1" color="white">{intl.formatMessage({ id: 'components.dogMatch.cardHeader' })}</Typography>}
        />
        <CardMedia image={dog.img} title={getDogImgAltText(dog)} sx={{ height: 450 }} />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h1" color="primary" fontWeight="bold">
            {dog.name}
          </Typography>
          <Typography variant="body1" fontSize="1.2em">{intl.formatMessage({ id: 'components.dogMatch.cardContent.dogDescription' }, { b: intlBoldify, breed: dog.breed, age: dog.age })}</Typography>
          <Typography variant="body1" fontSize="1.1em">{intl.formatMessage({ id: 'components.dogMatch.cardContent.zipCode' }, { b: intlBoldify, zipCode: dog.zip_code })}</Typography>
        </CardContent>
      </Card>
    }
  </>
}

DogMatch.propTypes = {
  dogId: PropTypes.string.isRequired,
};
