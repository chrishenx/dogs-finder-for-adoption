import React from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'

const About = () => {
  const intl = useIntl()

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'aboutPageHeader', defaultMessage: 'About' })}
    >
      <Scrollbar>
        <div style={{ padding: 12 }}>
          <ReactMarkdown className="markdown-body" children={intl.formatMessage({id: "aboutPageMarkdown"})} />
        </div>
      </Scrollbar>
    </Page>
  )
}
export default About
