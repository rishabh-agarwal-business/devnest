const ROUTES = {
    HOME: "/",
    COLLECTION: "/collection",
    FIND_JOBS: "/jobs",
    TAGS: "/tags",
    COMMUNITY: "/community",
    ASK_QUESTION: "/ask-question",
    PROFILE: "/profile",
    LOGIN: "/login",
    REGISTER: "/register",
    QUESTION: (_id: string) => `/question/${_id}`,
    TAG_WITH_ID: (_id: string) => `tags/${_id}`,
    PROFILE_WITH_ID: (_id: string) => `profile/${_id}`
}

export default ROUTES;