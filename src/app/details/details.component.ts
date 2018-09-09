import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';


import { Location } from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  public all;
  public character = [];    //final data which is renedered in view(this stores that after coverting url value into name of category)
  public allcharacter = []; // data is stored in this when it comes from api
  public house = [];
  public myHouse = [];
  public book = [];
  public mybook = [];
  public check;
  constructor(private _route: ActivatedRoute, private router: Router, private series: ServicesService, private location:Location) 
  {    
     console.log("Detail component called");
  }
  ngOnInit() {
  
    let name = this._route.snapshot.paramMap.get('entityName');
    let id = this._route.snapshot.paramMap.get('id');
    this.all = this.series.getCategory(name, id).subscribe(      //for getting single category
      data => {

        this.all = data;

        this.setVariabl(name, this.all);
      },
      error => {
        console.log(error.errorMessage);
        alert(`Some error occurs`);
      });

  }

  //method to  set variable acording to return object
  public setVariabl = (name: string, data) => {
    if (name == "characters") {
      this.allcharacter = data;

      this.character = this.getDetails(this.allcharacter);   

    }
    else if (name == "books") {
      this.mybook = data;
      this.book = this.getDetails(this.mybook);
     
    }
    else if (name == "houses") {
      this.myHouse = data;
      this.house = this.getDetails(this.myHouse);

    }

  }

  //check null value
  public checkValue = (value): boolean => {
    if (value.length != 0 && value[0] !== "") {
      return true;
    }
    else {
      return false;
    }

  }

  //* *  //method to get all details of string url which is in arrays in property 
  public getDetails = (mydata): any => {

    for (let i in mydata) {
      if (this.checkValue(mydata[i])) {
        if (typeof (mydata[i]) == "string" && mydata[i].search('https') > -1) {

          this.series.getviewDetail(mydata[i]).subscribe(
            data => {

              mydata[i] = data.name;

            },
            error => {
              console.log(error.errorMessage);

            });

        }
        if (Array.isArray(mydata[i]) && mydata[i][0].search('https') > -1) {
          let dataName = [];
          for (let singleUrl of mydata[i]) {
            this.series.getviewDetail(singleUrl).subscribe(
              data => {

                dataName.push(data.name);

              },
              error => {
                console.log(error.errorMessage);

              });

          }
          mydata[i] = dataName;

        }
      }
    }
    return mydata;

  } //end

  public goBack=():any =>{
    this.location.back();
  }

}
