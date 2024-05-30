export default interface IProfile {
    _id: string;
    firstName?: string | undefined | null;
    lastName?: string | undefined | null;
    email?: string | undefined | null;
    imageUrl?: string | undefined | null;
    bio?: string | undefined | null;
    interests?: string[]  | undefined | null;
    socials?: {
        twitter: string;
        linkedIn: string;
        discord: string;
        gitHub: string;
        instagram: string;
        website: string;
    } | undefined | null;
    points?: {
        totalPoints: number;
        referalPoints: number;
        rewardPoints: number;
    } | undefined | null;
    referralCode: string;
}