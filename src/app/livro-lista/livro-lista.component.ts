import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public livros: Array<Livro> = [];
  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor(servEditora: ControleEditoraService, servLivros: ControleLivrosService) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }

  ngOnInit(): void {
    this.livros = this.servLivros.obterLivros();
  }

  excluir = (codigo: number): void => {
    this.servLivros.excluir(codigo);
    this.livros = this.servLivros.obterLivros();
  };

  obterNome = (codEditora: number): string => {
    return this.servEditora.getNomeEditora(codEditora);
  };
}