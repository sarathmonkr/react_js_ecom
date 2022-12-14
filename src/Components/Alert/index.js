const Alert = ( props ) => {
    return (
        <div
            className="alert alert-secondary bg-light m-3 top-0 end-0 text-center position-fixed "
            style={{ zIndex: 99 }}
            role="alert"
        >
            {props.message}
        </div>
    );
};
export default Alert;