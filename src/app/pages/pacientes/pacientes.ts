import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { DataBrPipe } from '../../pipes/data-br.pipe';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DataBrPipe],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss'
})
export class PacientesComponent {

  private clienteService = inject(ClienteService);
  private router = inject(Router);

  pacientes: Cliente[] = [];

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  diasSelecionados: string[] = [];

  paciente: Cliente = {
    nome: '',
    email: '',
    telefone: '',
    dataPrimeiraConsulta: ''
  };

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.clienteService.listar().subscribe(res => {
      this.pacientes = res;
    });
  }

  toggleDia(dia: string) {
    const index = this.diasSelecionados.indexOf(dia);
    if (index >= 0) {
      this.diasSelecionados.splice(index, 1);
    } else {
      this.diasSelecionados.push(dia);
    }
  }

  salvar() {
    this.paciente.diasAtendimento = this.diasSelecionados.join(', ');

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
    this.diasSelecionados = p.diasAtendimento ? p.diasAtendimento.split(', ') : [];
  }

  excluir(id: number) {
    const paciente = this.pacientes.find(p => p.id === id);
    const nome = paciente?.nome ?? 'este paciente';

    const confirmado = confirm(
      `Tem certeza que deseja excluir ${nome}? Todas as consultas dele também serão excluídas. Essa ação não pode ser desfeita.`
    );

    if (!confirmado) {
      return;
    }

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
    this.diasSelecionados = [];
  }

  novoPaciente() {
    this.router.navigate(['/cadastro']);
  }
}