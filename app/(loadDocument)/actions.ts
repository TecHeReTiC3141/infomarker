"use server";

import convertioAxios, { ConvertioConvertResponse, ConvertioGetResponse } from "@/app/api/convertio/convertioAxios";
import { redirect } from "next/navigation";

export async function convertFileToTxt(filename: string, fileBase64: string) {
    // TODO: implement proper logging of all stages
    console.log("fileBase64 string", fileBase64);
    const convertResponse = await convertioAxios.post<ConvertioConvertResponse>("", {
        apikey: process.env.CONVERTIO_API_KEY,
        input: "base64",
        filename,
        file: fileBase64,
        outputformat: "txt",
    });
    const convertData = convertResponse.data;
    console.log(convertResponse.data);
    if (convertData.status !== "ok") {
        throw new Error(convertData.error);
    }
    // TODO: await until the file is finished processing (checking for status instead of trying of get file)
    const convertId = convertData.data.id;
    console.log(`convertion ID ${convertId} finished. ${convertData.data.minutes} minutes left`);
    const getResultResponse = await convertioAxios.get<ConvertioGetResponse>(`/${convertId}/dl`);
    if (getResultResponse.status !== 200) {
        throw new Error(getResultResponse.statusText);
    }
    // TODO: implement functionality of searching for foreign agents in text
    redirect(`/${convertId}`);
}

export async function getTextById(id: string) {
    const getResultResponse = await convertioAxios.get<ConvertioGetResponse>(`/${id}/dl`);
    const response = getResultResponse.data;
    if (response.status !== "ok") {
        throw new Error(response.error);
    }
    return response.data.content;
}