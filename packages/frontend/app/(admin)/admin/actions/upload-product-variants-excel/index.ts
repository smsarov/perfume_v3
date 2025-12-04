"use server";

import { productVariants } from '@db/schema';
import { db } from '@app/lib/db';

export async function uploadProductVariants(formData: FormData){
    const file = formData.get('file') as File;
    if(!file) return null;

    console.log(file.name);
    console.log(db.$client)
    return file.name;
}
