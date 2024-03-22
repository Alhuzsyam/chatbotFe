// config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  base_url = 'http://128.199.177.206:5173';

  constructor() { }
}
