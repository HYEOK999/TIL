import { connect } from 'react-redux';
import Navi from '../components/Navi';
import { logoutThunk } from '../actions';

export default connect(
  state => ({ token: state.token }),
  dispatch => ({
    logoutThunk: token => {
      dispatch(logoutThunk(token));
    },
  }),
)(Navi);
