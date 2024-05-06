"use server";

import convertioAxios, { ConvertioConvertResponse, ConvertioGetResponse } from "@/app/api/convertio/convertioAxios";
import { redirect } from "next/navigation";

export async function getFileText(filename: string, fileUrl: string) {
    // TODO: implement proper logging of all stages
    const convertResponse = await convertioAxios.post<ConvertioConvertResponse>("", {
        apikey: process.env.CONVERTIO_API_KEY,
        input: "base64",
        filename,
        file: fileUrl,
        outputformat: "txt",
    });
    const convertData = convertResponse.data;
    console.log(convertResponse.data);
    if (convertData.status !== "ok") {
        throw new Error(convertData.error);
    }
    const convertId = convertData.data.id;
    console.log(`convertion ID ${convertId} finished. ${convertData.data.minutes} minutes left`);
    const getResultResponse = await convertioAxios.get<ConvertioGetResponse>(`/${convertId}/dl`);
    if (getResultResponse.status !== 200) {
        throw new Error(getResultResponse.statusText);
    }
    // TODO: implement functionality of searching for foreign agents in text
    redirect(`/${convertId}`);
}