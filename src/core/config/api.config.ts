// import { environment } from "./app.config";
const environment = process.env.API_URL
export const API = {
    // users: environment + 'users',
    blogs: environment + 'blogs',
    plan: environment + 'plans'
}