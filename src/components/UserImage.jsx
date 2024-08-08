import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user);


const UserImage = ({ image, size ="60px"}) => {
    return(
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`${user.picture}`} // TODO: DOES THIS WORK?
            />
        </Box>
    );
};

export default UserImage;