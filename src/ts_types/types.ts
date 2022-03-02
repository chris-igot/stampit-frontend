export type PostType = {
    id: string;
    profile: string;
    profileName: string;
    image: string;
    stamps: StampType[];
    description: string;
    createdAt: string;
};

export type ImageFileType = {
    //TODO: Give this a better name
    id: string;
    fileName: string;
};

export type StampType = {
    id: string;
    image: string;
    x: number;
    y: number;
};

export type ProfileType = {
    id: string;
    name: string;
    image: string;
    title: string;
    bio: string;
    isPrivate: boolean;
    currentlyFollowing: number;
    followRequested: number;
    followers: number;
    followed: number;
    user: UserType;
};

export type UserType = {
    id: string;
    username: string;
    email: string;
    roles: string[];
};
