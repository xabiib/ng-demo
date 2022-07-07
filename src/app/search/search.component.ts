import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person, SearchService } from '../shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  // query: string | undefined;
  query!: string; // query: string = ''; will also work
  //This is called a definite assignment assertion. It’s a way to tell TypeScript “I know what I’m doing, the variable will be assigned.”
  searchResults: Person[] = [];
  
  constructor(private searchService: SearchService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']); 
        console.log( " this.query " + this.query ) ;
        this.search();
      }
    });
  }

  /*   search(): void {
      this.searchService.getAll().subscribe({
        next: (data: Person[]) => { this.searchResults = data },
        error: (e) => console.log(e)
      });
    } */

  search(): void {
    this.searchService.search(this.query).subscribe(
      (data: Person[]) => { this.searchResults = data; },
      error => console.log(error)
    );
  }

  ngOnDestroy(): void { if (this.sub) {
    this.sub.unsubscribe(); }
    }


}