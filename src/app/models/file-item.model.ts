export class FileItem {
    public file:File;
    public fileName:string;
    public url:string;
    public isLoading:boolean;
    public progress:number;

    constructor(file:File) { 
        this.file = file;
        this.fileName = file.name;
        this.isLoading = false;
        this.progress = 0;
    }
}