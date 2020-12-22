import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

class Astronaut {
  name: string;
  craft: string;

  constructor(init) {
    this.name = init.name;
    this.craft = init.craft;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'space-station';
  astronauts = [];
  private readonly baseUrl: string = 'http://api.open-notify.org/astros.json';

  constructor(private $http: HttpClient) {}

  ngOnInit() {
    this.getAstronauts();
  }

  public getAstronauts(): void{
    this.$http.get(this.baseUrl).subscribe((resp: any) => {
      console.log('resp', resp);
      this.astronauts = resp.people.map((astro) => {
        return new Astronaut(astro);
      });
      console.log('astronauts', this.astronauts);
    }, (err) => {
      console.log('err', err);
    });


  }

}
