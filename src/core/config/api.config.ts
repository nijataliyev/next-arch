// import { environment } from "./app.config";
const environment = process.env.API_URL
export const API = {
    // users: environment + 'users',
    blogs: environment + 'blogs',
    plan: environment + 'plans',
    partners: environment + 'partners',
    blogCategories: environment + 'blog-categories',
    blogTags: environment + 'blog-tags',
    mobPrefix: environment + 'mob-prefixes',
    contactRequest: environment + 'contact-request',
    scheduleDemo: environment + 'schedule-demo',
    subscribtion: environment + 'subscribtion'
}