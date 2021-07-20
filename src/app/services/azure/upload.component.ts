import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'azure-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class AzureUploadComponent {  
  file!: File;
  message: string | undefined;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.upload(this.file);
  }

  upload = (file) => {
    if (file.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.http.post(environment.baseUrl + '/upload', formData, { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true' }) })
      .subscribe(event => {
        this.message = 'Upload Successful.';
      })

  }
}