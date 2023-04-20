import "./Modal.css";

export const Modal = ({ children, show, close }) => {
  return show === true ? (
    <div
      className='modal'
      onClick={() => {
        close();
      }}>
      <div
        className='modal-content'
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {children}
      </div>
    </div>
  ) : null;
};
