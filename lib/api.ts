import type {
    ApiResponse,
    PaginatedResponse,
    About,
    Service,
    News,
    BlogPost,
    Testimonial,
    Education,
    Achievement,
    Experience,
    Partner,
    Skill,
    Category,
    FAQ,
    ContactPayload,
    ConsultationPayload,
    Project,
} from "./types"

const BASE_URL = "https://portfolio-backend-rh0y.onrender.com/api/v1"

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: 60 },
            ...options,
        })
        if (!res.ok) return null
        return await res.json()
    } catch {
        console.error(`API error: ${endpoint}`)
        return null
    }
}

// 1. About
export async function getAbout(): Promise<About | null> {
    const res = await fetchApi<ApiResponse<About>>("/about")
    return res?.data ?? null
}

// 2. Services
export async function getServices(): Promise<Service[]> {
    const res = await fetchApi<PaginatedResponse<Service>>("/services?sort=order&limit=100")
    return res?.data ?? []
}

export async function getServiceById(id: string): Promise<Service | null> {
    const res = await fetchApi<ApiResponse<Service>>(`/services/${id}`)
    return res?.data ?? null
}

// 3. Service Details
export async function getServiceDetails(serviceId?: string): Promise<import("./types").ServiceDetail[]> {
    const query = serviceId ? `?serviceId=${serviceId}` : ""
    const res = await fetchApi<PaginatedResponse<import("./types").ServiceDetail>>(`/service-details${query}`)
    return res?.data ?? []
}

// 4. Projects
export async function getProjects(): Promise<Project[]> {
    const res = await fetchApi<PaginatedResponse<Project>>("/projects?status=published&sort=-createdAt&limit=100")
    return res?.data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const all = await getProjects()
    return all.find((p) => p.slug === slug) ?? null
}

// 5. Skills
export async function getSkills(): Promise<Skill[]> {
    const res = await fetchApi<PaginatedResponse<Skill>>("/skills?sort=order&limit=100")
    return res?.data ?? []
}

// 6. Categories
export async function getCategories(type?: string): Promise<Category[]> {
    const query = type ? `?type=${type}` : ""
    const res = await fetchApi<PaginatedResponse<Category>>(`/categories${query}&limit=100`)
    return res?.data ?? []
}

// 7. Experiences
export async function getExperiences(): Promise<Experience[]> {
    const res = await fetchApi<PaginatedResponse<Experience>>("/experiences?sort=order&limit=100")
    return res?.data ?? []
}

// 8. Education
export async function getEducation(): Promise<Education[]> {
    const res = await fetchApi<PaginatedResponse<Education>>("/education?sort=order&limit=100")
    return res?.data ?? []
}

// 9. Achievements
export async function getAchievements(): Promise<Achievement[]> {
    const res = await fetchApi<PaginatedResponse<Achievement>>("/achievements?sort=order&limit=100")
    return res?.data ?? []
}

// 10. Partners
export async function getPartners(): Promise<Partner[]> {
    const res = await fetchApi<PaginatedResponse<Partner>>("/partners?sort=order&limit=100")
    return res?.data ?? []
}

// 11. Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
    const res = await fetchApi<PaginatedResponse<Testimonial>>("/testimonials?sort=order&limit=100")
    return res?.data ?? []
}

// 12. FAQs
export async function getFaqs(): Promise<FAQ[]> {
    const res = await fetchApi<PaginatedResponse<FAQ>>("/faqs?sort=order&limit=100")
    return res?.data ?? []
}

// 13. News
export async function getNews(limit = 10): Promise<News[]> {
    const res = await fetchApi<PaginatedResponse<News>>(`/news?status=published&sort=-publishedAt&limit=${limit}`)
    return res?.data ?? []
}

export async function getNewsById(id: string): Promise<News | null> {
    const res = await fetchApi<ApiResponse<News>>(`/news/${id}`)
    return res?.data ?? null
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
    const all = await getNews(100)
    return all.find((n) => n.slug === slug) ?? null
}

// 14. Blog Posts
export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
    const res = await fetchApi<PaginatedResponse<BlogPost>>(`/blog-posts?status=published&sort=-publishedAt&limit=${limit}`)
    return res?.data ?? []
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    const res = await fetchApi<ApiResponse<BlogPost>>(`/blog-posts/${id}`)
    return res?.data ?? null
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const all = await getBlogPosts(100)
    return all.find((b) => b.slug === slug) ?? null
}

// 15. Contact form (POST /contacts)
export async function submitContact(data: ContactPayload): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        return res.ok
    } catch {
        return false
    }
}

// 16. Consultation (POST /consultations)
export async function submitConsultation(data: ConsultationPayload): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/consultations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        return res.ok
    } catch {
        return false
    }
}
