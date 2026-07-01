import { Component, inject } from '@angular/core';
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
  // injeta o service
  private clienteService = inject(ClienteService);

  constructor() {
    const nav = this.router.getCurrentNavigation();

    const clienteEditando = nav?.extras?.state?.['cliente'];

    if (clienteEditando) {
      this.cliente = clienteEditando;
    }
  }

  // objeto que representa o formulário
  cliente: Cliente = {
    nome: '',
    dataPrimeiraConsulta: '',
    telefone: '',
    email: ''
  };

  // salvar cliente
  salvar() {

  if (this.cliente.id) {
    // UPDATE
    this.clienteService.atualizar(this.cliente).subscribe(() => {
      this.router.navigate(['/consulta']);
    });

  } else {
    // CREATE
    this.clienteService.salvar(this.cliente).subscribe(() => {
      this.router.navigate(['/consulta']);
    });
  }
}

  // limpar formulário
  limpar() {
    this.cliente = {
      nome: '',
      dataPrimeiraConsulta: '',
      telefone: '',
      email: ''
    };
  }
}