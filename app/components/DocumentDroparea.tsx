"use client";

import { FaPlus } from "react-icons/fa6";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import FileIcon from "@/app/components/FileIcon";


export default function DocumentDroparea() {

    const [ file, setFile ] = useState<File | null>(null);

    const [ error, setError ] = useState<string>("");

    const [ isDragEntered, setIsDragEntered ] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    function validateFile(file: File): boolean {
        const fileTypes = [ "application/msword", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf" ];
        const maxSize = 10 * 1024 * 1024;
        if (file === undefined) return false;
        if (!fileTypes.includes(file.type)) {
            setError("Не поддерживаемый тип файла. Проверьте, что файл имеет одно из следующих расширений .doc, .docx, .pdf, .txt");
            return false;
        }
        if (file.size > maxSize) {
            setError("Слишком большой файл. Размер файла должен быть до 10 МБ");
            return false;
        }
        return true;
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[ 0 ];
        if (!file) return;
        console.log(file?.name, file?.type);
        setError("");
        if (validateFile(file)) {
            setFile(file);
        }
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        console.log("Dropped");
        event.preventDefault();
        setError("");
        setIsDragEntered(false);
        const file = event.dataTransfer?.files[ 0 ];
        if (validateFile(file)) {
            setFile(file);
        }
    }

    return (
        <div className="w-full">
            <div className="w-full h-96 bg-base-200 hover:bg-base-300 transition-colors duration-200
            border-4 border-dashed border-base-content/60
            flex flex-col gap-y-6 items-center justify-center rounded-xl"
                 onDragEnter={() => setIsDragEntered(true)}
                 onDragLeave={() => setIsDragEntered(false)}
                 onDragOver={event => event.preventDefault()}
                 onDrop={handleDrop}>
                {file ? <FileIcon file={file} clearFile={() => setFile(null)}/>
                    : <>
                        <FaPlus size={80} onDragEnter={event => event.preventDefault()}/>
                        <p className="text-xs text-center select-none">{isDragEntered ? "Отпустите для загрузки" :
                            <>"Перетащите в эту область файл для проверки (doc, docx, pdf, txt до 10 МБ)"<br/> "или
                                нажмите на
                                кпопку"</>}</p>
                        {!isDragEntered &&
                            <button className="btn btn-sm" onClick={() => fileInputRef.current?.click()}>Загрузить
                                файл</button>}
                    </>
                }
            </div>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange}/>
            {error && <p className="text-error text-center mt-2">{error}</p>}
        </div>
    )
}