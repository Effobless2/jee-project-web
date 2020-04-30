import {Component, ElementRef, Input, ViewChild} from '@angular/core';

export interface FileSelectChangeEvent{
    target: {
        files: FileList
    };
}

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent{
    @ViewChild('fileInput') fileInput: ElementRef;
    image: File;
    imagePict: string|ArrayBuffer;
    reader: FileReader;
    @Input('subscriber') subscriber :({target: {files: FileList}}) => any = () => {};
    @Input('previsualization') previsualization: boolean = true;

    get imageName(): string{
        let maxSize: number = 10;
        if(!this.image)
            return "No Files";
        let result: string = this.image.name.substring(0,10);
        if(this.image.name.length > maxSize)
            result += "...";
        return result;
    }

    onFileSelected(event :FileSelectChangeEvent){
        this.image = event.target.files[0] || this.image;
        if(!this.image)
            return null;
        this.reader = new FileReader();
        this.reader.readAsDataURL(this.image);
        this.reader.onload = (_event) => {
          this.imagePict = this.reader.result;
          this.subscriber(event);
        }
    }

    onFileDelete(){
        this.image = this.imagePict = null;
        this.reader = null;
        this.fileInput.nativeElement.value = null;
        this.subscriber({
            target: {
                files: null
            }
        } as FileSelectChangeEvent);
    }
}
