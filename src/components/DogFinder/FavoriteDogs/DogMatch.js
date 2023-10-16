// DogMatch component, receives a dogId as property, and fetches the dog from the API. It renders a Modal with the dog information.


// Path: src/components/DogFinder/FavoriteDogs/DogMatch.js
// Compare this snippet from src/components/DogFinder/DogResults.js:

import { useRequest } from "hooks/useRequest";
import { getDogImgAltText } from "../utils";

const { Typography, CircularProgress, Box, Card, CardMedia, CardContent, CardHeader } = require("@mui/material");

export const DogMatch = ({ dogId }) => {
  const { data: [dog], loading } = useRequest(`/dogs`, [{}], { method: 'POST', body: [dogId] });

  // Container dog name as heading
  return <>
    {loading ? (
      <Box>
        <Typography variant="h6" component="h2">
          Found your perfecto dog!
        </Typography>
        <CircularProgress />
      </Box>
    ) :
      <Card elevation={20} raised>
        <CardHeader sx={{ textAlign: 'center', borderBottom: 3, borderBottomColor: "primary.main", fontWeight: "500" }} title={<Typography variant="h3" component="h1" color="secondary">Your perfecto dog is here!</Typography>} />
        <CardMedia image={dog.img} title={getDogImgAltText(dog)} sx={{ height: 320 }} />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h1" color="primary" fontWeight="bold">
            {dog.name}
          </Typography>
          <Typography variant="body1" fontSize="1.2em">A beautiful <b>{dog.breed}</b>, <b>{dog.age}</b> years old is waiting for you!</Typography>
          <Typography variant="body1" fontSize="1.1em">Located at Zip Code <b>{dog.zip_code}</b></Typography>
        </CardContent>
      </Card>
    }
  </>
}
