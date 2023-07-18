import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, switchMap} from "rxjs";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  constructor(
    private readonly heroService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit() {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroService.getHeroById(id))
      ).subscribe(hero => {

      if (!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    })


  }

  onSubmit() {

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {

      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`)
        });
      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        // TODO : show snackbar and navigate to
        // /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created!`);

      });

  }

  onDeleteHero() {

    if (!this.currentHero.id) throw Error('Hero Id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>
          this.heroService.deleteHeroById(this.currentHero.id)
        ),
        filter((isDeleted: boolean) => isDeleted),
      )
      .subscribe(result => {
          this.router.navigate(['/heroes']);
        }
      );
  }


  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }
}
