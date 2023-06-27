import formidable from "formidable";
import ConfigurationService from "./ConfigurationService";

const fs = require('fs');

export default class FileUploadService {

    private AllConfiguration: {
        category: string,
        parameters: {
            sizeLimit: number,
            fileTypes: string[]
        }
    }[];
    private CurrentId: number;
    private MainFilePath: string;
    private configService: ConfigurationService

    constructor(conf: ConfigurationService) {
        this.configService = conf;
        this.AllConfiguration = conf.getConfiguration("fileUploadConfigurations");
        this.CurrentId = conf.getConfiguration("fileUploadId");
        this.MainFilePath = conf.getConfiguration("uploadFolder");
    }

    private updateFileId() {
        this.configService.setConfiguration("fileUploadId", this.CurrentId + 1);
    }

    public handleFileUpload(category: string, file: formidable.File): string {

        let config = this.AllConfiguration.find(c => (c.category == category.toLowerCase()));

        if (!config) {
            throw new Error(`Unknown file upload type of ${category} `);
        }

        if (file.size > config.parameters.sizeLimit) {
            throw new Error("File upload size is over the permitted size");
        }

        if (!file.originalFilename) {
            throw new Error("File Name not found");
        }

        const fileNameArray = file.originalFilename?.split(".");

        if (fileNameArray?.length < 2) {
            throw new Error("Could not extract file extension!");
        }

        const fileType = fileNameArray[fileNameArray.length - 1];
        const fileName = `file_${category.toLowerCase()}_${this.CurrentId}.${fileType}`;
        const newFilePath = `${this.MainFilePath}/${fileName}`;

        // if(fs.existsSync(newFilePath)) {
            
        // }
        fs.renameSync(file.filepath, newFilePath);
        this.updateFileId();

        return fileName;

    }

    public getFileAddress(): string {
        return this.MainFilePath;
    }

};