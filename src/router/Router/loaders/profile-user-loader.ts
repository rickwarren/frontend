import { getUserBySlug } from "../../../services/api/user";

export const profileUserLoader = async (params: any) => {
    const user = await getUserBySlug(params.slug);
    return user
}