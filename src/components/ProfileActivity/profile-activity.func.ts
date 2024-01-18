import { useEffect, useState } from "react";
import { useFetchUserQuery } from "../../features/api/api-slice";
import { useSession } from "../../hooks";
import { useRouteLoaderData } from "react-router-typesafe";
import { UserDto } from "../../services/api/user/dto/user.dto";

const getCurrentProfile = async () => {
    const [usr, setUsr] = useState<any>();
    const user: UserDto = useRouteLoaderData('user') as UserDto;
    const path = location.pathname;
    const patharr = path.split('/');
    const { data = [], isFetching } = await useFetchUserQuery(patharr[2]);    

    if(patharr[1] === 'profile') {
        setUsr(data);
    } else {
        setUsr(user);
    }

    return usr;
}

export default getCurrentProfile;