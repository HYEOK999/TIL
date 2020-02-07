import { connect } from 'react-redux';
import Navi from '../components/Navi';
// import { logout } from '../redux/modules/auth';
import { signOutSaga } from '../redux/modules/auth';

export default connect(
  state => ({ token: state.auth.token }),
  dispatch => ({
    logout: () => {
      dispatch(signOutSaga());
    },
  }),
)(Navi);
