import { connect } from 'react-redux';
import SigninForm from '../components/SigninForm';
import { login } from '../redux/modules/auth';
export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  dispatch => ({
    login: (email, password) => {
      dispatch(login(email, password));
    },
  }),
)(SigninForm);
