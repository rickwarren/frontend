import { useState } from "react";
import { UserDto } from "../../services/api/user/dto/user.dto";
import { getCurrentUser, getUserBySlug } from "../../services/api/user";

const getCurrentProfile = async () => {
    const [usr, setUsr] = useState<UserDto>();
    const path = location.pathname;
    const patharr = path.split('/');
    if (patharr[1] === 'profile') {
        setUsr(await getUserBySlug(patharr[2]));
    } else {
        setUsr(await getCurrentUser());
    }

    return usr;
}

export default getCurrentProfile;