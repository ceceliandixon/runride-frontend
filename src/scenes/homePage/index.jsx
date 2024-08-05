import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
    const user = useSelector((state) => state.user);

    const fullName = user ? `${user.given_name} ${user.family_name}` : '';

    // Now you can use the `user` variable in your component
    return (
        <div>
            {user ? <h1>Hello, {fullName}</h1> : <h1>Welcome!</h1>}
        </div>
    );
};

export default HomePage;