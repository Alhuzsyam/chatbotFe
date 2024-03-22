import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  typedText: any = '';
  nama: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  alert:string='';
  namaInvalid: boolean = false;
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  
  constructor(private http: HttpClient, private router: Router,private configService: ConfigService) {
    const textToType: string = "apa ada hal yang bisa saya bantu tuan ? ";
    this.typeText(textToType, 0);
  }
   base_url = this.configService.base_url

  typeText(text: string, index: number) {
    this.typedText = text.substring(0, index);
    if (index < text.length) {
      setTimeout(() => {
        this.typeText(text, index + 1);
      }, 100); 
    }
  }

  handleClick(){
    this.namaInvalid = !this.nama;
    this.emailInvalid = !this.email;
    this.passwordInvalid = !this.password;

    if (this.namaInvalid || this.emailInvalid || this.passwordInvalid) {
      this.message = 'input field tidak boleh kosong!';
      this.alert='alert alert-warning'
    } else {
      this.message = 'Form berhasil dikirim!';
      const data = { name: this.nama, email: this.email, password: this.password };
      this.http.post<any>(this.base_url+'/api/users/add', data).subscribe(
        response => {
          // console.log(data);
          // if(data)
          console.log(response.status); // Tindakan lanjutan setelah berhasil melakukan POST
          if(response.status == "400 BAD_REQUEST"){
            this.message = 'email telah terdaftar'
            this.alert='alert alert-warning'
          }else{
            this.message = 'berhasil mendaftar!';
            this.alert='alert alert-success'
            this.clearForm()
          }
        },
        error => {
          console.error(error); // Tindakan jika terjadi error saat melakukan POST
          this.message = 'Terjadi kesalahan saat mengirim data!';
        }
      );
    }
  }
  clearForm() {
    this.nama = '';
    this.email = '';
    this.password = '';
  }

  login(){
    this.emailInvalid = !this.email;
    this.passwordInvalid = !this.password;
  
    if (this.emailInvalid || this.passwordInvalid) {
      this.message = 'Input field tidak boleh kosong!';
      this.alert = 'alert alert-warning';
    } else {
      const body = { email: this.email, password: this.password };
      this.http.post<any>(this.base_url+'/api/users/login', body).subscribe(
        response => {
          if(response.status === "404 NOT_FOUND"){
            this.message = 'email / password salah!';
            this.alert = 'alert alert-warning';
          } else {
            localStorage.setItem('token', response.payload.id);
            localStorage.setItem('data', JSON.stringify(response.payload));
            localStorage.setItem('refreshDone', 'true');
            // Redirect ke halaman dashboard atau halaman lain yang sesuai
            this.router.navigate(['/dashboard/prompt']);
          }
        },
        error => {
          console.error(error);
          this.message = 'Terjadi kesalahan saat login!';
          this.alert = 'alert alert-danger';
        }
      );
    }
}

}
