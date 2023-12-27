import { useEffect, useState } from "react";
import { useFetchUserQuery } from "../../features/api/api-slice";
import { useSession } from "../../hooks";

const getCurrentProfile = async () => {
    const [usr = null, setUsr] = useState<any>();
    const { user } = useSession();
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