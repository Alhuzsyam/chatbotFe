import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})

export class PromptComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient, private router: Router, private cs:ConfigService) {}
  
  prompt: string = '';
  message: string = '';
  bot: string = '';
  status: string = '';
  typingDelay: number = 50; // Delay between each character typing in milliseconds
  typingInterval: any; // Interval reference for typing animation
  idValue: any;
  base_url = this.cs.base_url
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval); // Cleanup interval to prevent memory leaks
  }

  sent() {
    if (!this.prompt) {
      this.message = "Field tidak boleh kosong!";
      this.status = 'warning';
    } else {
      this.http.get<any>(this.base_url+'/api/bot/chat?prompt=' + this.prompt).subscribe(
        response => {
          console.log(response);
          const res = response.payload;
          const status = response.status;
          if (status === "200 OK") {
            // Start typing effect for received message
            this.typeReceivedMessage(res);
          } else {
            this.message = 'Terjadi kesalahan saat mengirim data, silakan hubungi administrator!';
            this.status = 'danger';
          }
        },
        error => {
          console.error(error);
          this.status = 'warning';
          this.message = 'Terjadi kesalahan saat mengirim data!';
        }
      );
    }
  }

  typeReceivedMessage(message: string) {
    this.bot = ''; // Clear previous message
    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < message.length) {
        this.bot += message.charAt(index);
        index++;
      } else {
        clearInterval(this.typingInterval); // Stop typing animation
      }
    }, this.typingDelay);
  }

  save() {
    const dataFromLocalStorage = localStorage.getItem("data");

    // Periksa apakah data dari localStorage tidak null
    if (dataFromLocalStorage !== null) {
      try {
        // Mengurai string JSON menjadi objek JavaScript
        const parsedObject = JSON.parse(dataFromLocalStorage);
        this.idValue = parsedObject.id;
        const data = { userId: this.idValue, prompt: this.prompt, result: this.bot };
        this.http.post<any>(this.base_url+'/api/prompt/add', data).subscribe(
          res => {
            this.message = "Data berhasil disimpan";
            this.status = 'success';
          },
          error => {
            this.message = "Terjadi kesalahan saat menyimpan data!";
            this.status = 'danger';
          }
        );
      } catch (error) {
        this.status = 'danger';
        this.message = 'Terjadi kesalahan dalam parsing JSON';
        console.error("Terjadi kesalahan dalam parsing JSON:", error);
      }
    } else {
      console.error("Data dari localStorage tidak tersedia atau null.");
      this.router.navigate(['/']);
    }
  }

  reset() {
    this.prompt = '';
    this.bot = '';
  }
}
