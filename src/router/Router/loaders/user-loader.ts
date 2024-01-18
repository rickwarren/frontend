import { useSession } from "../../../hooks/useSession";
import { getCurrentUser } from "../../../services/api/user";

export const userLoader = async () => {
    const user = await getCurrentUser();
    return user
}