import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Form,
  Button,
  Icon,
  Image,
} from 'semantic-ui-react'

const Signin = ({ styles, handleClick, handleSubmit }) => {
  const args = {}

  const handleChange = (event, input) => { args[input.name] = input.value }

  return (
    <div>
      <div style={styles.box}>
        <Image src='images/logo.png' alt='logo' />
        <Form onSubmit={event => handleSubmit(event, args)}>
          <Form.Field>
            <Form.Input
              name='email'
              placeholder='Email o nombre de usuario'
              icon={<Icon
                name='check circle outline'
                size='large'
                color='green'
              />}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name='password'
              type='password'
              placeholder='Contraseña'
              icon={<Icon
                name='remove circle outline'
                size='large'
                color='red'
              />}
              onChange={handleChange}
            />
          </Form.Field>
          <Button type='submit' fluid primary>
            Iniciar sesión
          </Button>
        </Form>
        <Divider horizontal>O</Divider>
        <Button color='facebook'>
          <Icon name='facebook' /> Iniciar sesión con facebook
        </Button>
      </div>
      <div style={styles.box}>
        ¿No tienes una cuenta? <a href='' onClick={handleClick}>Regístrate</a>
      </div>
    </div>
  )
}

Signin.propTypes = {
  styles: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default Signin
