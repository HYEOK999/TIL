import { connect } from 'react-redux';
import Navi from '../components/Navi';
import { logout } from '../redux/modules/auth';

export default connect(
  state => ({ token: state.auth.token }),
  dispatch => ({
    logout: token => {
      dispatch(logout(token));
    },
  }),
)(Navi);
