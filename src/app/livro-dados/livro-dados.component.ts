import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  livro: Livro = new Livro('', 0, '', '', []);
  editoras: any[] = [];
  autores: string[] = [''];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
  }

  async incluir() {
    this.livro.codigo = ''; // MongoDB assigns _id
    const sucesso = await this.servLivros.incluir(this.livro);
    if (sucesso) {
      this.router.navigateByUrl('/lista');
    }
  }

  adicionarAutor() {
    this.autores.push('');
  }
}