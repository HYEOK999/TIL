import { useSelector } from 'react-redux';

export default function useToken() {
  const token = useSelector(state => state.auth.token);

  return token;
}
