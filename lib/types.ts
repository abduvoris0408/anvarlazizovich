// API Response Types

export interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
}

export interface PaginatedResponse<T> {
    success: boolean
    count: number
    pagination: {
        page: number
        limit: number
        total: number
        pages: number
    }
    data: T[]
}

// Image object from Cloudinary
export interface CloudinaryImage {
    url: string
    publicId: string
}

// About model
export interface About {
    id: string
    fullName: string
    title: string
    subtitle: string
    typingTexts: string[]
    avatar: CloudinaryImage | null
    coverImage: CloudinaryImage | null
    resume: CloudinaryImage | null
    bio: string
    shortBio: string
    phone: string
    email: string
    address: string
    birthday: string
    nationality: string
    freelanceStatus: string
    location: {
        city: string
        country: string
        mapUrl: string
    }
    languages: { name: string; level: string }[]
    socialLinks: {
        telegram?: string
        instagram?: string
        facebook?: string
        [key: string]: string | undefined
    }
    stats: {
        projectsCompleted: number
        happyClients: number
        yearsExperience: number
        awardsWon: number
        coffeesDrunk: number
        linesOfCode: number
    }
    interests: string[]
    whatIDo: { title: string; description: string; icon: string }[]
    seo: {
        metaTitle: string
        metaDescription: string
        metaKeywords: string[]
        ogImage: string
    }
    isActive: boolean
    age: number
    createdAt: string
    updatedAt: string
    // Legacy field aliases (backward compat)
    biography?: string
    telegram?: string
    consultationStatus?: string
    profileImage?: CloudinaryImage | null
    resumeFile?: CloudinaryImage | null
}

// Category model
export interface Category {
    id: string
    name: string
    slug: string
    type: "project" | "blog" | "service" | "skill" | "news"
    description: string
    icon: string
    color: string
    image: CloudinaryImage | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

// Service model
export interface Service {
    id: string
    title: string
    slug: string
    description: string
    icon: string
    image: CloudinaryImage | null
    categoryId: string
    price: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    category?: Category
    details?: ServiceDetail[]
    // Legacy
    ServiceDetails?: ServiceDetail[]
}

export interface ServiceDetail {
    id: string
    serviceId: string
    title: string
    description: string
    icon: string
    order: number
    createdAt: string
    updatedAt: string
    service?: { id: string; title: string; slug: string }
}

// Project model
export interface Project {
    id: string
    title: string
    slug: string
    shortDescription: string
    description: string
    image: CloudinaryImage | null
    gallery: CloudinaryImage[]
    clientUrl: string
    categoryId: string
    status: "published" | "draft" | "archived"
    isFeatured: boolean
    views: number
    order: number
    completedAt: string
    createdAt: string
    updatedAt: string
    category?: Category
}

// Skill model
export interface Skill {
    id: string
    name: string
    level: "beginner" | "intermediate" | "advanced" | "expert"
    percentage: number
    icon: string
    image: CloudinaryImage | null
    categoryId: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    category?: Category
}

// Experience model
export interface Experience {
    id: string
    company: string
    position: string
    description: string
    specializations: string[]
    location: string
    companyUrl: string
    companyLogo: CloudinaryImage | null
    startDate: string
    endDate: string | null
    current: boolean
    order: number
    createdAt: string
    updatedAt: string
}

// Education model
export interface Education {
    id: string
    school: string
    degree: string
    fieldOfStudy: string
    description: string
    gpa: number
    achievements: string[]
    schoolUrl: string
    schoolLogo: CloudinaryImage | null
    startDate: string
    endDate: string
    current: boolean
    order: number
    createdAt: string
    updatedAt: string
    // Legacy aliases
    institution?: string
    year?: string
}

// Achievement model
export interface Achievement {
    id: string
    title: string
    issuer: string
    date: string
    image: CloudinaryImage | null
    description: string
    type: "license" | "certificate" | "award" | "membership"
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    // Legacy aliases
    value?: string
    icon?: string
}

// Partner model
export interface Partner {
    id: string
    name: string
    logo: CloudinaryImage | null
    url: string
    description: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

// Testimonial model
export interface Testimonial {
    id: string
    clientName: string
    clientPosition: string
    clientImage: CloudinaryImage | null
    content: string
    rating: number
    caseType: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    // Legacy aliases
    name?: string
    role?: string
    image?: CloudinaryImage | null
}

// FAQ model
export interface FAQ {
    id: string
    question: string
    answer: string
    categoryId: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
    category?: Category
}

// News model
export interface News {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    image: CloudinaryImage | null
    categoryId: string
    source: string
    sourceUrl: string
    status: "published" | "draft"
    isFeatured: boolean
    views: number
    publishedAt: string
    createdAt: string
    updatedAt: string
    category?: Category
    tags?: { id: string; name: string }[]
    // Legacy aliases
    readTime?: string
    isPublished?: boolean
}

// Blog Post model
export interface BlogPost {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    image: CloudinaryImage | null
    categoryId: string
    status: "published" | "draft"
    isFeatured: boolean
    views: number
    readTime: number
    allowComments: boolean
    metaTitle: string
    metaDescription: string
    publishedAt: string
    createdAt: string
    updatedAt: string
    category?: Category
    tags?: { id: string; name: string }[]
}

// POST /contacts payload
export interface ContactPayload {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
}

// POST /consultations payload
export interface ConsultationPayload {
    fullName: string
    phone: string
    email?: string
    serviceId?: string
    preferredDate?: string
    preferredTime?: string
    message?: string
}
