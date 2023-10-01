import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {}

  getTemperature(): Observable<number> {
    const temperatureRef = this.db.object<number>('/temperature');
    return temperatureRef.valueChanges().pipe(
      map(value => value || 0) // Ako je value null, zamijenite ga s 0
    );
  }

  getHumidity(): Observable<number> {
    const humidityRef = this.db.object<number>('/humidity');
    return humidityRef.valueChanges().pipe(
      map(value => value || 0) // Ako je value null, zamijenite ga s 0
    );
  }
  getDiode(): Observable<number> {
    const diodeRef = this.db.object<number>('/dioda');
    return diodeRef.valueChanges().pipe(
      map(value => value || 0) // Ako je value null, zamijenite ga s 0
    );
  }
  getBroj(): Observable<number> {
    const brojRef = this.db.object<number>('/broj');
    return brojRef.valueChanges().pipe(
      map(value => value || 0) // Ako je value null, zamijenite ga s 0
    );
  }


  ovo:any;
  setDiode(value: number): Observable<void> {
    // Postavi vrijednost diode na true (1) ili false (0)
    const diodaValue = value ? 1 : 0;
    this.ovo=this.db.object('/dioda').set(diodaValue);
    return this.ovo;
  }
  /*getTemperatureData(): Observable<number> {
    return this.db.object<number>('/temperature').valueChanges();
  }
*/

}
