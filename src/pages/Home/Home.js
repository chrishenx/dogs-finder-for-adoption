import Page from "material-ui-shell/lib/containers/Page";
import React from "react";
import { useIntl } from "react-intl";

import DogFinderView from "components/DogFinder";

const HomePage = () => {
  const intl = useIntl();

  return (
    <Page pageTitle={intl.formatMessage({ id: "home" })}>
      <DogFinderView />
    </Page>
  );
};
export default HomePage;
