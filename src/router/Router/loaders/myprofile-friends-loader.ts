import { getFriendsByUserId } from "../../../services/api/friend-list";
import { getCurrentUser } from "../../../services/api/user";

export const myprofileFriendsLoader = async () => {
    const user = await getCurrentUser();
    return await getFriendsByUserId(user.id)

}