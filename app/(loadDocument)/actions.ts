"use server";

export async function getFileText(fileUrl: string) {
    await new Promise(resolve => setTimeout(resolve, 5000));
}