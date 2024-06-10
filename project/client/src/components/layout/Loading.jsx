import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading">
            <FaSpinner className="spinner" />
            <span className="loading-text">Loading...</span>
        </div>
    );
};

export default Loading;
