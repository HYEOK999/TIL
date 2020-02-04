import { connect } from 'react-redux';
import Books from '../components/Books';
import { setBooksThunk } from '../actions';

const mapStateToProps = state => ({
  books: state.books,
  token: state.token,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setBooks: async token => {
    dispatch(setBooksThunk(token));
    // try {
    //   const res = await axios.get('https://api.marktube.tv/v1/book', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   dispatch(setBooks(res.data));
    // } catch (error) {}
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
