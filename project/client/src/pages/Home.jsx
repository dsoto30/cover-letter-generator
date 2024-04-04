import { Route, Routes } from "react-router-dom";
import { Profile } from "./Profile";
export function Home() {
    return (
        <Routes>
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}
