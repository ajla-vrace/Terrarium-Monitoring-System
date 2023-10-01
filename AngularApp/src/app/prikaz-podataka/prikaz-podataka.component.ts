import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
//import {Chart} from "chart.js";
import {FirebaseService} from "../firebase.service";
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-prikaz-podataka',
  templateUrl: './prikaz-podataka.component.html',
  styleUrls: ['./prikaz-podataka.component.css']
})
export class PrikazPodatakaComponent implements OnInit {

  temp:any=20;
  temperature:any=50;
  temperature$!: Observable<number>;
  humidity$!: Observable<number>;
  dioda$: Observable<number> | undefined;
  temperatureHistory: any = [];
  humidityHistory: any = [];
  timeHistory: any = [];
  humidityTimeHistory: any = [];

  temperatureChartInstance: any;
  temperatureBarChartInstance:any;
  humidityBarChartInstance:any;
  humidityChartInstance: any;
  analiza: any=false;
  upozorenje:any=false;
  humidityValue: any=0;
  temperatureValue: any=0;
  diodaValue: any=false;
  mailSent:any=false;
  mailCounter:any=0;

  constructor(private firebaseService: FirebaseService, private router:Router, private http:HttpClient) {}
  datum:any;

  randomInteger:any;
  ngOnInit(): void {
    this.randomInteger = Math.floor(Math.random() * 100) + 1;
    this.dioda$=this.firebaseService.getDiode();




    this.firebaseService.getTemperature().subscribe(temperature => {
      this.temperatureHistory.push(temperature);
      const now1 = new Date();
      const hours = now1.getHours().toString().padStart(2, '0');
      const minutes = now1.getMinutes().toString().padStart(2, '0');
      const seconds = now1.getSeconds().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}:${seconds}`;

      this.timeHistory.push(currentTime);


      console.log("temp je",this.temperatureHistory);
      this.updateTemperatureChart();
      this.updateTemperatureBarChart();
    });






    this.firebaseService.getHumidity().subscribe(humidity => {
      /*this.humidityHistory.push(humidity);
      this.humidityTimeHistory.push(new Date().toLocaleTimeString()); // Dodajte trenutno vreme za vlagu u niz
      this.updateHumidityChart();

      console.log("vlaznost" ,this.humidityHistory);
*/
      this.humidityHistory.push(humidity);

      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}:${seconds}`;

      this.humidityTimeHistory.push(currentTime);
//this.humidityValue=humidity;
      this.updateHumidityChart();
      this.updateHumidityBarChart();
      console.log("vlaznost je:",this.humidityHistory);
    });

    this.temperature$ = this.firebaseService.getTemperature();
    this.humidity$ = this.firebaseService.getHumidity();

    /* this.createTemperatureChart();
     this.createHumidityChart();*/
    this.humidity$.subscribe(humidity => {
      this.humidityValue = humidity;
      if (this.humidityValue > 75 && this.mailSent==false && this.mailCounter==0) {
        this.SendMail(this.temperatureValue,this.humidityValue);
        this.mailSent=true;
        this.mailCounter++;
      }
      else if( this.humidityValue<75 && this.temperatureValue<31 && this.mailSent==true && this.mailCounter==1) {
        this.mailSent=false;
        this.mailCounter--;
      }
    });
    this.temperature$.subscribe(temperature => {
      this.temperatureValue = temperature;
      if (this.temperatureValue > 31  && this.mailSent==false && this.mailCounter==0) {
        this.SendMail(this.temperatureValue,this.humidityValue);
        this.mailSent=true;
        this.mailCounter++;
      }
      else if( this.temperatureValue<31 && this.humidityValue<75 && this.mailSent==true && this.mailCounter==1) {
        this.mailSent=false;
        this.mailCounter--;
      }
    });







    const now2 = new Date();
    /* const hours1 = now2.getHours().toString().padStart(2, '0');
     const minutes1 = now2.getMinutes().toString().padStart(2, '0');
     const seconds1 = now2.getSeconds().toString().padStart(2, '0');*/
    this.datum=now2;



  }

  createTemperatureChart() {
    const canvas = document.getElementById('temperatureChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }

    const labels = this.timeHistory;

    if (this.temperatureChartInstance) {
      this.temperatureChartInstance.destroy();
    }

    // noinspection TypeScriptValidateTypes
    this.temperatureChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          data: this.temperatureHistory,
          borderColor:'rgb(85,134,85)',
          backgroundColor:'rgba(172,234,186,0.3)',
          pointBackgroundColor: 'rgb(48,96,48)',
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          },
          x: {
            beginAtZero: false
          }
        }
      }
    });
  }

  createHumidityChart() {
    const canvas = document.getElementById('humidityChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }

    const labels = this.humidityTimeHistory;

    if (this.humidityChartInstance) {
      this.humidityChartInstance.destroy();
    }

    // noinspection TypeScriptValidateTypes
    this.humidityChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Vlažnost',
          data: this.humidityHistory,
          borderColor:'rgb(71,71,182)',
          backgroundColor:'rgba(131,200,229,0.3)',
          pointBackgroundColor: 'rgb(27,27,115)',
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          },
          x: {
            beginAtZero: false
          }
        }
      }
    });
  }


















  updateTemperatureChart() {
    if (this.temperatureChartInstance) {
      const labels = this.timeHistory;

      this.temperatureChartInstance.data.labels = labels;
      this.temperatureChartInstance.data.datasets[0].data = this.temperatureHistory;
      this.temperatureChartInstance.update();
    }
  }


  updateTemperatureBarChart() {
    if (this.temperatureBarChartInstance) {
      const labels = this.timeHistory;

      this.temperatureBarChartInstance.data.labels = labels;
      this.temperatureBarChartInstance.data.datasets[0].data = this.temperatureHistory;
      this.temperatureBarChartInstance.update();
    }
  }

  updateHumidityBarChart() {
    if (this.humidityBarChartInstance) {
      const labels = this.humidityTimeHistory;

      this.humidityBarChartInstance.data.labels = labels;
      this.humidityBarChartInstance.data.datasets[0].data = this.humidityHistory;
      this.humidityBarChartInstance.update();
    }
  }


  updateHumidityChart() {
    if (this.humidityChartInstance) {
      const labels = this.humidityTimeHistory;

      this.humidityChartInstance.data.labels = labels;
      this.humidityChartInstance.data.datasets[0].data = this.humidityHistory;
      this.humidityChartInstance.update();
    }
  }
  ovdje(){
    this.createTemperatureChart();
    this.createHumidityChart();
    this.createTemperatureBarChart();
    this.createHumidityBarChart();
  }

  idi_na_analizu() {
    // this.router.navigate(['temperatura']);
    this.analiza=true;
    /* this.createTemperatureChart();
     this.createHumidityChart();*/
    setTimeout(()=>{
      this.createTemperatureChart();
      this.createHumidityChart();
      this.createTemperatureBarChart();
      this.createHumidityBarChart();

    },500);


  }
  idi_na_pocetna(){
    this.analiza=false;
  }









  activateDiode() {
    // Postavi vrijednost diode na true (1) u Firebase bazi podataka
    this.firebaseService.setDiode(1);/*.subscribe(() => {
      console.log('Dioda je aktivirana');
    });*/
    this.diodaValue=true;
  }
  unactivateDiode() {
    // Postavi vrijednost diode na true (1) u Firebase bazi podataka
    this.firebaseService.setDiode(0);/*.subscribe(() => {
      console.log('Dioda je neaktivana');
    });*/
    this.diodaValue=false;
  }






  SendMail(temperature1:number, humidity1:number ) {
    this.http.post("https://localhost:7147/Email/VrijednostVanGranica?temperatura="+temperature1+"1&vlaznost="+humidity1, {},
      { responseType: 'text' })
      .subscribe((povratnaVrijednost: any) => {
        console.log("Uspješno poslan mail.", povratnaVrijednost);
      }, error => {
        console.error("Greška pri slanju maila:", error);
      });
  }








  createTemperatureBarChart() {
    const canvas = document.getElementById('temperatureBarChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }

    const labels = this.timeHistory; // Postavite etikete na odgovarajuće vrednosti

    if (this.temperatureBarChartInstance) {
      this.temperatureBarChartInstance.destroy();
    }

    // noinspection TypeScriptValidateTypes
    this.temperatureBarChartInstance = new Chart(ctx, {
      type: 'bar', // Postavite tip na bar
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          data: this.temperatureHistory,
          backgroundColor: 'rgb(85, 134, 85)', // Postavite boju šipki
          borderColor: 'rgb(85, 134, 85)', // Postavite boju granice
          borderWidth: 1, // Postavite širinu granice
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          },
          x: {
            beginAtZero: false
          }
        }
      }
    });
  }






  createHumidityBarChart() {
    const canvas = document.getElementById('humidityBarChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }

    const labels = this.humidityTimeHistory; // Postavite etikete na odgovarajuće vrednosti

    if (this.humidityBarChartInstance) {
      this.humidityBarChartInstance.destroy();
    }

    // noinspection TypeScriptValidateTypes
    this.humidityBarChartInstance = new Chart(ctx, {
      type: 'bar', // Postavite tip na bar
      data: {
        labels: labels,
        datasets: [{
          label: 'Vlažnost',
          data: this.humidityHistory,
          borderColor:'rgb(71,71,182)',
          backgroundColor:'rgba(71,71,182)',
          borderWidth: 1, // Postavite širinu granice
          //pointBackgroundColor: 'rgb(27,27,115)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          },
          x: {
            beginAtZero: false
          }
        }
      }
    });
  }







}
