import { Directive, ElementRef, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';
import { isUndefined, isNullOrUndefined } from 'util';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('dragover', ['$event'])
  onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this.preventAndStop(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any) {
    this.mouseOver.emit(false);
    
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    
    const transfer = this.getTransfer(event);

    if (!transfer) return;

    this.extractFiles(transfer.files);

    this.preventAndStop(event);

    this.mouseOver.emit(false);
  }

  getTransfer(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  extractFiles(files: FileList) {
    for(let prop in Object.keys(files)) {
      const temporalFile = files[prop];
      if(this.fileCanBeLoad(temporalFile)) {
        const newFile = new FileItem(temporalFile);
        this.files.push(newFile);
      }
    }
  }

  //Validations

  private fileCanBeLoad(file: File): boolean {
    if (!this.fileHaveBeenDropped(file.name) && this.isImage(file.type)) {
      return true;
    } else {
      return false;
    }
    return
  }

  private preventAndStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private fileHaveBeenDropped(name: string): boolean {
    for (let { fileName } of this.files) {
      if (fileName === name) {
        console.log(`File ${fileName} already exists in the List`);
        return true;
      }
    }
    return false;
  }

  private isImage(fileType: string): boolean {
    return fileType === '' || isNullOrUndefined(fileType) ? false : fileType.startsWith('image');
  }

}
