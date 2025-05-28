import { Component, OnInit } from '@angular/core';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  editoras: any[] = [];
  livros: Livro[] = [];
  carregado: boolean = false;

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) {}

  async ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
    this.livros = await this.servLivros.obterLivros();
    this.carregado = true;
  }

  async excluir(codigo: string) {
    await this.servLivros.excluir(codigo);
    this.livros = await this.servLivros.obterLivros();
    this.carregado = false;
    this.carregado = true;
  }
}