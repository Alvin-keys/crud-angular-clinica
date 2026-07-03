import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroComponent {

  private router = inject(Router);
  private clienteService = inject(ClienteService);

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  diasSelecionados: string[] = [];

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const clienteEditando = nav?.extras?.state?.['cliente'];

    if (clienteEditando) {
      this.cliente = clienteEditando;
      this.diasSelecionados = clienteEditando.diasAtendimento
        ? clienteEditando.diasAtendimento.split(', ')
        : [];
    }
  }

  cliente: Cliente = {
    nome: '',
    dataPrimeiraConsulta: '',
    telefone: '',
    email: '',
    idade: undefined,
    queixaPrincipal: '',
    composicaoFamiliar: '',
    rotina: '',
    contatoEmergencia: '',
    diasAtendimento: '',
    horarioAtendimento: ''
  };

  toggleDia(dia: string) {
    const index = this.diasSelecionados.indexOf(dia);
    if (index >= 0) {
      this.diasSelecionados.splice(index, 1);
    } else {
      this.diasSelecionados.push(dia);
    }
  }

  salvar() {
    this.cliente.diasAtendimento = this.diasSelecionados.join(', ');

    this.clienteService.salvar(this.cliente).subscribe({
      next: (cliente) => {
        console.log(cliente);
        alert("Salvou com sucesso!");
        this.limpar();
      },
      error: (erro) => {
        console.error(erro);
        alert("Deu erro!");
      }
    });
  }

  limpar() {
    this.cliente = {
      nome: '',
      dataPrimeiraConsulta: '',
      telefone: '',
      email: '',
      idade: undefined,
      queixaPrincipal: '',
      composicaoFamiliar: '',
      rotina: '',
      contatoEmergencia: '',
      diasAtendimento: '',
      horarioAtendimento: ''
    };
    this.diasSelecionados = [];
  }
}