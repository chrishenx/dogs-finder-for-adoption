import Scrollbar from "material-ui-shell/lib/components/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page";
import React from "react";
import { useIntl } from "react-intl";
import ReactMarkdown from "react-markdown";

const About = () => {
  const intl = useIntl();

  return (
    <Page
      pageTitle={intl.formatMessage({ id: "aboutPageHeader", defaultMessage: "About" })}
    >
      <Scrollbar>
        <div style={{ padding: 12 }}>
          <ReactMarkdown className="markdown-body">
            {intl.formatMessage({id: "aboutPageMarkdown"})}
          </ReactMarkdown>
        </div>
      </Scrollbar>
    </Page>
  );
};
export default About;
