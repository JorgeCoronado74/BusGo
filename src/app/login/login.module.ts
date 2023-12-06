// login.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Agregamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Agregamos HttpClientModule

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Agregamos ReactiveFormsModule aquí
    IonicModule,
    HttpClientModule, // Agregamos HttpClientModule aquí
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
