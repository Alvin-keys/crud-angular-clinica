import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss'
})
export class PacientesComponent {

  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private consultaService = inject(ConsultaService);

  pacientes: Cliente[] = [];

  paciente: Cliente = {
    nome: '',
    email: '',
    telefone: '',
    dataPrimeiraConsulta: ''
  };

  consultasPaciente: any[] = [];
pacienteSelecionadoNome = '';

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.clienteService.listar().subscribe(res => {
      this.pacientes = res;
    });
  }

  salvar() {
    if (this.paciente.id) {
      this.clienteService.atualizar(this.paciente).subscribe(() => {
        this.listar();
        this.limpar();
      });
    } else {
      this.clienteService.salvar(this.paciente).subscribe(() => {
        this.listar();
        this.limpar();
      });
    }
  }

  editar(p: Cliente) {
    this.paciente = { ...p };
  }

  excluir(id: number) {
  this.clienteService.excluir(id).subscribe(() => {
    this.listar();
  });
}

  limpar() {
    this.paciente = {
      nome: '',
      email: '',
      telefone: '',
      dataPrimeiraConsulta: ''
    };
  }

  verConsultas(p: Cliente) {

  this.pacienteSelecionadoNome = p.nome;

  this.consultaService.buscarPorPaciente(p.id!)
    .subscribe(res => {
      this.consultasPaciente = res;
    });
}
  novoPaciente() {
  this.router.navigate(['/cadastro']);
}
}