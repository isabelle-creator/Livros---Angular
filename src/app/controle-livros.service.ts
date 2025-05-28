import { Injectable } from '@angular/core';
import { Livro } from './livro';

interface LivroMongo {
  _id: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  baseURL = 'http://localhost:3030/livros';

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(this.baseURL, { method: 'GET' });
    const livrosMongo: LivroMongo[] = await response.json();
    return livrosMongo.map(livroMongo => new Livro(
      livroMongo._id,
      livroMongo.codEditora,
      livroMongo.titulo,
      livroMongo.resumo,
      livroMongo.autores
    ));
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo)
    });
    return response.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const response = await fetch(`${this.baseURL}/${codigo}`, { method: 'DELETE' });
    return response.ok;
  }
}