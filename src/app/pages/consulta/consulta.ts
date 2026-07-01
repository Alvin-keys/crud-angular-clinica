import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class ConsultaComponent {

  private router = inject(Router);

  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];

  displayedColumns = [
    'nome',
    'dataPrimeiraConsulta',
    'telefone',
    'email',
    'acoes'
  ];

  constructor() {
    this.carregarClientes();
  }

  carregarClientes() {
  this.clienteService.listar().subscribe(data => {
    this.clientes = data;
  });
}

  editar(cliente: Cliente) {
    this.router.navigate(['/cadastro'], {
      state: { cliente }
    });
  }

  excluir(cliente: Cliente) {
  this.clienteService.excluir(cliente.id!).subscribe(() => {
    this.carregarClientes();
  });
}

}