import { AuthPersonModel } from './../utils/models/authperson.model';
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import {Router} from "@angular/router"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, } from "@angular/material/dialog";
import { AuthService } from '../utils/services/auth.service';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild("myNameElem") myNameElem: ElementRef;

  constructor(
     private router: Router,   
     private formBuilder: FormBuilder,
     private authService: AuthService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required,/*Validators.minLength(4), Validators.maxLength(8),Validators.pattern(TEXT_ONLY)*/],
      password: ['', Validators.required],
    });
  }

  


  onLogin():void{
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const tempPerson:AuthPersonModel ={username:username,password:password};
      this.authService.login(tempPerson).subscribe(result => {
        console.log(result.signed);
        if(result.signed&&result.signed!=null){
          this.showPopUp("Hola "+result.username);
        }
      
       },error=>{
          console.log(error);
          this.showSnackBar("Usuario o Contraseña no Valida.",2000);
       });
    }else {
      this.showSnackBar("Campos Vacios o Incorrectos ",2000);
    }
  }

  keyAcion(event: KeyboardEvent) {
    console.log(this.myNameElem.nativeElement.value);
    this.myNameElem.nativeElement.value=this.myNameElem.nativeElement.value.toLowerCase();
    this.myNameElem.nativeElement.value=this.myNameElem.nativeElement.value.replace(/\s/g, '');
 
  }
 

  showPopUp(value:string):void{
    let dialogRef = this.dialog.open(ResultDialogComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.result = value;
  }
  showSnackBar(value:string,duration:number):void{
    this.snackBar.open(value, 'Cerrar', {
      duration: duration});
  }
}
