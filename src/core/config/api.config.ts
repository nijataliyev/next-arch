// import { environment } from "./app.config";
const environment = process.env.API_URL
export const API = {
    posts: environment + 'posts'
}