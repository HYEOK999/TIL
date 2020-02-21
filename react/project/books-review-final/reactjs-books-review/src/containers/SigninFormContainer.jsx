import { connect } from 'react-redux';
import SigninForm from '../components/SigninForm';
import { startLoginSaga } from '../redux/modules/auth';

export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  dispatch => ({
    login: (email, password) => {
      dispatch(startLoginSaga(email, password));
    },
  }),
)(SigninForm);
