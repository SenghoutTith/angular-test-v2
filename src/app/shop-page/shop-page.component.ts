import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';
import { TreeSelectModule } from 'primeng/treeselect';
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import Swal from 'sweetalert2';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';

declare var $: any;

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
  standalone: true,
  imports: [ DialogModule, ButtonModule, InputTextModule, CommonModule, FormsModule, TreeSelectModule, ReactiveFormsModule, ToastModule, RippleModule, PaginatorModule, DataViewModule],
  providers: [ MessageService ]
})
export class ShopPageComponent implements OnInit{

  pokemonForm!: any;
  pokemonLists!: Pokemon[];

  rows: number = 5;

  @ViewChild('paginator') paginator: Paginator | undefined;

  constructor( private pokemonService: PokemonService, private form: FormBuilder, private messageService: MessageService) {
    this.pokemonForm = this.form.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      isCool: ['', Validators.required],
      isStrong: ['', Validators.required],
      type: ['', Validators.required]
    });
   }

  
  

  visible: boolean = false;
  showDialog() {
      this.visible = true;
  }

  isAddProductClick: boolean = false;
  
  handleAddProductClick(){
    this.isAddProductClick = !this.isAddProductClick;
  }

  deleteConfirmation(id: any){
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.remove(id);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  

  getPokemon(page: any, perPage: any): void{
    this.pokemonService.getPokemons(page, perPage).subscribe(
      (data: Pokemon[]) => {
        this.pokemonLists = data;
      }
    );
  }

  handleSubmit(): void{
    if(this.pokemonForm.invalid){
      console.log(this.pokemonForm.value);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' }); 
      this.pokemonForm.markAllAsTouched();
    }else{
      this.pokemonForm.value.id = (this.pokemonLists.length + 1).toString();
      this.pokemonService.postPokemon(this.pokemonForm.value).subscribe(
        (data: Pokemon) => {
          Swal.fire("Added!", "", "success");
          this.pokemonLists.push(data);
          this.pokemonForm.reset();
        }
      );
    }
  }

  remove(id: any): void {
    this.pokemonService.deletePokemon(id).subscribe(
      (data: Pokemon) => {
        Swal.fire("Delete!", "", "success");
        this.pokemonLists = this.pokemonLists.filter((pokemon: Pokemon) => pokemon.id !== id);
      }
    );
    // this.messageService.add({ severity: 'success', summary: 'Remove Success', detail: 'Pokemon Remove Successfully' });
  }

  updatePokemonForm!: any;
  toggleEdit: boolean = false;

  handleEdit(pokemon: Pokemon): void{
    this.pokemonForm.patchValue(pokemon);
    this.showDialog();
  }

  onConfirm(){
    this.pokemonService.updatePokemon(this.pokemonForm.value).subscribe(
      (data: Pokemon) => {
        Swal.fire("Update!", "", "success");
        this.pokemonLists = this.pokemonLists.map((pokemon: Pokemon) => pokemon.id === data.id ? data : pokemon);
        this.pokemonForm.reset();
        this.visible = false;
      }
    );
  }

  color: boolean = false;

  changeColor():void {
    this.color = !this.color;
    $("#title").css("color", this.color ? "red" : "black");
  }


  pictureFile: any;

  uploadFile(event: any){
    if(event.target.files[0] != null){

      if(event.target.files[0].size > 1000000){
        Swal.fire("Error!", "File size is too large", "error");
        return;
      }

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pictureFile = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onPageChange(event: any){
    console.log(event);
    
    // {page: 0, first: 0, rows: 5, pageCount: 3}
    this.getPokemon(event.first, event.rows);
  }

  pokemonListLength: any = 0;

  gatAllPokemon(): void{
    this.pokemonService.getAllPokemons().subscribe(
      (data: Pokemon[]) => {
        this.pokemonListLength = data.length;
      }
    );
  }

  ngOnInit(): void {
    this.pokemonLists = [];
    this.getPokemon(0, this.rows);
    this.gatAllPokemon();
  }

}
