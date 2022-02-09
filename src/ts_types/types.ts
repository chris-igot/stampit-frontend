export type PostType = {
    id: string;
    profile: string;
    image: string;
    stamps: StampType[];
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
    currentlyFollowing: boolean;
    followers: number;
    amFollowing: number;
    user: UserType;
};

export type UserType = {
    id: string;
    username: string;
    email: string;
    roles: string[];
};

export interface OutputType<T> {
    status: number;
    json: T;
    error?: string;
}
