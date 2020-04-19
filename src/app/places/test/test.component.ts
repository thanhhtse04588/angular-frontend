
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @Output() onUpload: EventEmitter<string>;
  isHovering: boolean;
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {

      if (files.item(i).type.match('image.*')) {
        (files.item(i).size > 2000000) ? alert("Tệp ảnh không quá 2 MB") : this.files.push(files.item(i));
      } else {
        alert('Tệp phải là định dạng hình ảnh');
      }

    }
  }
  onUploadedFile(uploadLink: string) {
    this.onUpload.next(uploadLink);
  }
}