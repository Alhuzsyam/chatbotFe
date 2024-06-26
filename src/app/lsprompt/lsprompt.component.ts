import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-lsprompt',
  templateUrl: './lsprompt.component.html',
  styleUrls: ['./lsprompt.component.css']
})
export class LspromptComponent implements OnInit {
  constructor(private http: HttpClient, private cs:ConfigService) { }
  id: string = '';
  prompts: any[] = []; // Menyimpan data prompt dari server
  base_url = this.cs.base_url
  ngOnInit(): void {
    const dataFromLocalStorage = localStorage.getItem("data");
    if (dataFromLocalStorage) {
      try {
        const parsedData = JSON.parse(dataFromLocalStorage);
        this.id = parsedData.id.toString(); // Menyimpan id sebagai string
        this.http.get<any>(this.base_url+"/api/prompt/" + this.id).subscribe(
          res => {
            console.log(res);
            this.prompts = res.payload; // Menyimpan data prompt dari server
          },
          error => {
            console.error("Terjadi kesalahan:", error);
            // Handle error here
          }
        );
      } catch (error) {
        console.error("Terjadi kesalahan dalam parsing JSON:", error);
      }
    } else {
      console.error("Data dari localStorage tidak tersedia atau null.");
    }
  }
  delete(id:number){
    this.http.get<any>(this.base_url+"/api/prompt/delete/" + id).subscribe(
      res => {
        window.location.reload(); // Refresh the page
      },
      error => {
        console.error("An error occurred while deleting the prompt:", error);
        alert("An error occurred while deleting the prompt. Please try again."); // Alert the user about the error
      }
    );
  }
}
