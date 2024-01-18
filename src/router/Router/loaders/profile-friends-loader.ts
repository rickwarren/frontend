import { getFriendsByUserId } from "../../../services/api/friend-list";
import { getUserBySlug } from "../../../services/api/user";

export const profileFriendsLoader = async (params: any) => {
    const user = await getUserBySlug(params.slug);
    return await getFriendsByUserId(user.id);
}