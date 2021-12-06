import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";


function useOutsideAlerter(ref, props) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.showPanel();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function OutsideListener(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideListener.propTypes = {
    children: PropTypes.element.isRequired
};

export default OutsideListener;
