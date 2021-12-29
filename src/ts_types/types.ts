export interface PostType {
    id: number | string;
    image: string;
    stamps: StampType[];
}

export interface StampType {
    id: number | string;
    image: string;
    x: number;
    y: number;
}

export interface ProfileType {
    name: string;
    image: string;
    title: string;
    bio: string;
}
