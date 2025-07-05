export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    about: string;
    details: {
        client: string;
        year: string;
        services: string;
    };
    galleryImages: {
        url: string;
        alt: string;
        dataAiHint?: string;
    }[];
}
