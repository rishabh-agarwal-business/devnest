import { SIDEBAR_IMAGE_LINKS, SIDEBAR_LABELS } from "@/enum";
import { SideBarLink } from "@/types/global";
import ROUTES from "./routes";

export const sideBarLinks: SideBarLink[] = [
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.HOME,
        label: SIDEBAR_LABELS.HOME,
        route: ROUTES.HOME
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.COMMUNITY,
        label: SIDEBAR_LABELS.COMMUNITY,
        route: ROUTES.COMMUNITY
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.COLLECTION,
        label: SIDEBAR_LABELS.COLLECTION,
        route: ROUTES.COLLECTION
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.FIND_JOBS,
        label: SIDEBAR_LABELS.FIND_JOBS,
        route: ROUTES.FIND_JOBS
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.TAGS,
        label: SIDEBAR_LABELS.TAGS,
        route: ROUTES.TAGS
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.PROFILE,
        label: SIDEBAR_LABELS.PROFILE,
        route: ROUTES.PROFILE
    },
    {
        imageUrl: SIDEBAR_IMAGE_LINKS.ASK_QUESTION,
        label: SIDEBAR_LABELS.ASK_QUESTION,
        route: ROUTES.ASK_QUESTION
    },
]