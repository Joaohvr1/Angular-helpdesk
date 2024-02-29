import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})


export class LoginComponent implements OnInit{

  form: any;
  mensagem!: String;

  user = {} as User;
  users!: User[];



  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              ){
    
  }
  ngOnInit(): void {
    this.buildForm();

  }

  buildForm(){
    this.form = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

  logar(form: NgForm){
    console.log(form);
    const login = form.value.login;
    const password = form.value.senha;

    if(!login || !password){
      this.mensagem = "Login e Senha não podem ser nulos";
      return
    }

    this.authService.login(login, password).subscribe( () => {
      this.cleanForm(this.form);
      this.mensagem = "Login efetuado com sucesso"
    })
  }

  getUser(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }
}
