import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const Loading = () => {
    return (
        <div className="loading-container">
            <AiOutlineLoading className="loading-icon" />
            <p>Loading...</p>
        </div>
    );
};
