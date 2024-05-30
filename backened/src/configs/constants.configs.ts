const PORT = process.env.PORT || 9871;
const SECRET = process.env.SECRET!;
const basePath = "/api/v1"
const DATABASES = {
    PROFILE: "profile",
    POINTS: "point",
    CAMPAIGN: "campaign",
    PRODUCT: "product"
};
const JWT_SECRET = process.env.JWT_SECRET!;
const MAXAGE = 3 * 24 * 60 * 60;

const MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database:"
    },
    PROFILE: {
        CREATED: "Profile created successfully.",
        FETCHED: "Profile fetched successfully.",
        INVALID_ID: "UserId doesn't exist.",
        DUPLICATE_EMAIL: "Email already exist.",
        UPDATED: "Profile details updated successfully.",
        NOT_FOUND: "Profile not found."
    },
    CAMPAIGN: {
        DUPLICATE_TITLE: "Title already exist.",
        CREATED: "Campaign created successfully.",
        FETCHED: "Campaign fetched successfully.",
        NOT_FOUND: "Campaign not found.",
        UPDATED_CAMPAIGN: "Campaign updated.",
        FETCHED_COUNT: "User's campaign count fetched successfully."
    },
    AUTH: {
        TOKEN_ERROR: 'Access Denied: Please login first',
        NOT_ADMIN: "Access denied: Admins only.",
        INVALID_TOKEN: 'Access Denied: Invalid token'
    },
    UNEXPECTED_ERROR: "An unexpected error occured."
};
const INTERESTS: string[] = ["Content", "Development", "Trading", "Earning", "Blockchain", "Bounty"];
const FRONTEND_SIGNUP_LINK = "";

export {
    PORT,
    SECRET,
    basePath,
    MESSAGES,
    DATABASES,
    INTERESTS,
    FRONTEND_SIGNUP_LINK,
    JWT_SECRET,
    MAXAGE
};