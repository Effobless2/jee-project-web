import {Component, ElementRef, Input, ViewChild} from '@angular/core';

export interface FileSelectChangeEvent {
    target: {
        files: FileList
    };
}

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
    @ViewChild('fileInput') fileInput: ElementRef;
    image: File;
    imagePict: string|ArrayBuffer;
    reader: FileReader;
    @Input() previsualization = true;
    @Input() subscriber: ({target: { files: FileList}}) => any = () => {};

    get imageName(): string {
        const maxSize = 10;
        if (!this.image) {
            return 'No Files';
        }
        let result: string = this.image.name.substring(0, 10);
        if (this.image.name.length > maxSize) {
            result += '...';
        }
        return result;
    }

    onFileSelected(event: FileSelectChangeEvent) {
        this.image = event.target.files[0] || this.image;
        if (!this.image) {
            return null;
        }
        this.reader = new FileReader();
        this.reader.readAsDataURL(this.image);
        this.reader.onload = (onLoadEvent: any) => {
          this.imagePict = this.reader.result;
          this.subscriber(onLoadEvent);
        };
    }

    onFileDelete() {
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
