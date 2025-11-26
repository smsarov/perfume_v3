import { drizzle } from "drizzle-orm/node-postgres";

export function createDbClient(url: string){
    return drizzle(url)
}
