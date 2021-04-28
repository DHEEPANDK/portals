import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-shopplanec',
  templateUrl: './shopplanec.component.html',
  styleUrls: ['./shopplanec.component.css']
})
export class ShopplanecComponent implements OnInit {

  bukrs: any;
   show = false;
   show1 = false;
  constructor(@Inject(MAT_DIALOG_DATA) public sale : any,private data : DataService,private rou : Router
  , private spinner : NgxSpinnerService,public dialog: MatDialog) { 
    if(sale.tp === "edit"){this.show = true }else{this.show1 = true}
  }

  ngOnInit(): void {}

  updt1() {
    this.spinner.show();
    let plnum = (document.getElementById("oid") as HTMLInputElement).value;
    let  totqty= (document.getElementById("qty") as HTMLInputElement).value;
    let sdate = (document.getElementById("sdat") as HTMLInputElement).value;
    let edate = (document.getElementById("edat") as HTMLInputElement).value;
    let firm = (document.getElementById("status") as HTMLInputElement).value;
    if(firm === "Success"){firm = "0"}
    else{firm="X"}
    this.bukrs= this.data.getBukrs();
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify([{"bukrs":this.bukrs,"pwd":"","edate":edate,"firm":firm,"matnr":"","plnum":plnum,
    "prodnum":"","scqty":"0","totqty":totqty,"sdate":sdate ,"typ":"PLANU"}]);
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }; 

   

    this.data.shop(options).then((response)=>{

      response.json().then((res) => {
      if(res === "valid")
      {
        this.spinner.hide();
        this.dialog.closeAll();
        console.log(res);
        window.alert("updated successfully");
        this.rou.navigate(['shopfloorlogin/dashboard']);
        
      }
      })
    })

  }

  crt() {
    this.spinner.show();
   
    let  totqty= (document.getElementById("qty") as HTMLInputElement).value;
    let sdate = (document.getElementById("sdat") as HTMLInputElement).value;
    let edate = (document.getElementById("edat") as HTMLInputElement).value;
    let m1 = (document.getElementById("mid") as HTMLInputElement).value;
   
    this.bukrs= this.data.getBukrs();
    let matnr = "000000000000000";
   matnr = matnr.concat(m1);
    console.log(totqty,sdate,edate,matnr,this.bukrs)
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify([{"bukrs":this.bukrs,"pwd":"","edate":edate,"firm":"","matnr":matnr,"plnum":"",
    "prodnum":"","scqty":"00.000","totqty":totqty,"sdate":sdate ,"typ":"PLANC"}]);
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }; 

   

    this.data.shop(options).then((response)=>{

      response.json().then((res) => {
      if(res === "valid")
      {
        this.spinner.hide();
        this.dialog.closeAll();
        console.log(res);
        window.alert("created successfully");
        this.rou.navigate(['shopfloorlogin/dashboard']);
        
      }
      })
    })

  }

}
