import ReactDOM from 'react-dom';

const Modal = ({ children }) =>
  ReactDOM.createPortal(children, document.getElementById('modal'));

export default Modal;
