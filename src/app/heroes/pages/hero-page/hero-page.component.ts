import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {Hero} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: []
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private readonly heroService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      return;
    })
  }

  gotBack() {
    this.router.navigateByUrl('heroes/list');
  }
}
