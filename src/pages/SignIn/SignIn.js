import { Button, TextField, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useRequest } from 'hooks/useRequest'
import { request } from 'utils'

const SignIn = ({ redirectTo = '/' }) => {
  const { appConfig } = useConfig()
  const intl = useIntl()
  const theme = useTheme()
  const navigate = useNavigate()
  let location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    authenticate({
      name: name,
      email: email,
    })
  }

  const authenticate = async (user) => {
    const response = await request(appConfig.api.signIn, { body: user, method: 'POST' })
    if (response.status === 200) {
      setAuth({ isAuthenticated: true, ...user })
      toggleThis('isAuthMenuOpen', false)
  
      let from = new URLSearchParams(location.search).get('from')
  
      if (from) {
        navigate(from, { replace: true })
      } else {
        navigate(redirectTo, { replace: true })
      }
    }
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <CustomPaper elevation={6}>
        <div
          sytle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: 'sign_in' })}
          </Typography>
          <form
            sytle={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
          >
            <TextField
              value={name}
              onInput={(e) => setName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label={intl.formatMessage({ id: 'name' })}
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label={intl.formatMessage({ id: 'email' })}
              type="email"
              id="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              {intl.formatMessage({ id: 'sign_in' })}
            </Button>
          </form>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default SignIn
