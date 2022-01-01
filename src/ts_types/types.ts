export interface PostType {
    id: string;
    image: string;
    stamps: StampType[];
}

export interface StampType {
    id: string;
    image: string;
    x: number;
    y: number;
}

export interface ProfileType {
    id: string;
    name: string;
    image: string;
    title: string;
    bio: string;
}
