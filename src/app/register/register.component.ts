import { PersorModel } from './../utils/models/person.model';
import { Component, OnInit ,ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../utils/services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { NUMBER_ONLY } from '../utils/validators/customValidator';
import {MatDialog, } from "@angular/material/dialog";
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
{

  registerForm: FormGroup;


  @ViewChild("myNameElem") myNameElem: ElementRef;
  
  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required,],
      dni: ['', [    Validators.required,
                Validators.maxLength(10),
                Validators.pattern(NUMBER_ONLY),] 
            ],
      age: ['', [Validators.required,Validators.min(18)] ],
      password: ['', Validators.required, ],
      repeatPassword: ['', Validators.required],
      city: [''],

    });
  }
  


  onRegister():void{
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const name = this.registerForm.value.name;
      const dni = this.registerForm.value.dni;
      const age = this.registerForm.value.age;
      const city = this.registerForm.value.password;
      const password = this.registerForm.value.password;
      const repeatPassword = this.registerForm.value.repeatPassword;
     
      if(password == repeatPassword){
        const tempPerson:PersorModel ={name:name,username:username,dni:dni,age:age,password:password,city:city};
        this.authService.create(tempPerson).subscribe(result => { this.showPopUp("Bienvenido: "+result.name);   });
      }else
      {
        this.showPopUp("Contraseñas No Coinciden ");
      }
    
    }
    else{ 
      this.showPopUp("Campos Vacios o Incorrectos ");      
    }
  
  }
  
///Validadores 

 keyAcion(event: KeyboardEvent) {
   console.log(this.myNameElem.nativeElement.value);
   this.myNameElem.nativeElement.value=this.myNameElem.nativeElement.value.toLowerCase();
   this.myNameElem.nativeElement.value=this.myNameElem.nativeElement.value.replace(/\s/g, '');
 }
  
 validateInputDNI($event):void{

    if(this.registerForm.controls.dni.errors?.pattern)
    {
      this.showSnackBar("Valor Invalido",600);
    }

  }

  validateInputAGE($event):void{
      if(this.registerForm.get('age').dirty && this.registerForm.controls.age.errors?.min)
      {
          this.showSnackBar("Debes ser Mayor de Edad para Registrar",800);
      }
  }
// PopUp

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
