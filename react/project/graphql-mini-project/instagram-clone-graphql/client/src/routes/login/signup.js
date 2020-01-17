import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Form,
  Button,
  Icon,
  Image,
} from 'semantic-ui-react'

const Signup = ({ styles, handleClick, handleSubmit }) => {
  const args = {}

  const handleChange = (event, input) => { args[input.name] = input.value }

  return (
    <div>
      <div style={styles.box}>
        <Image src='images/logo.png' alt='logo' />
        <h4>Regístrate para ver fotos y videos de tus amigos.</h4>
        <Form onSubmit={event => handleSubmit(event, args)}>
          <Button color='facebook'>
            <Icon name='facebook' /> Iniciar sesión con facebook
          </Button>
          <Divider horizontal>O</Divider>
          <Form.Field>
            <Form.Input
              name='email'
              placeholder='Email'
              icon={<Icon
                name='remove circle outline'
                size='large'
                color='red'
              />}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name='fullname'
              placeholder='Nombre'
              icon={<Icon
                name='remove circle outline'
                size='large'
                color='red'
              />}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name='username'
              placeholder='Nombre de usuario'
              icon={<Icon
                name='remove circle outline'
                size='large'
                color='red'
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
          <Button type='submit' fluid primary>Registrate</Button>
        </Form>
      </div>
      <div style={styles.box}>
        ¿Tienes una cuenta? <a href='' onClick={handleClick}>Inicia sesión</a>
      </div>
    </div>
  )
}

Signup.propTypes = {
  styles: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default Signup
