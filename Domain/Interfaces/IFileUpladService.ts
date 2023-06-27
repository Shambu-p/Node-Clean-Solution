import formidable from "formidable";

export default interface FileUploadService {

    updateFileId<T>(): T

    handleFileUpload(category: string, file: formidable.File): string

    getFileAddress(): string

};