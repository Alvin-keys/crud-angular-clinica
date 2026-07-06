import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConsultaService, Consulta } from '../../services/consulta.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { DataBrPipe } from '../../pipes/data-br.pipe';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DataBrPipe],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class ConsultaComponent {

  private consultaService = inject(ConsultaService);
  private clienteService = inject(ClienteService);

  consultas: Consulta[] = [];
  pacientes: Cliente[] = [];

  dataConsulta = '';
  observacoes = '';
  pacienteSelecionado!: number;

  consultaEditandoId?: number;
  pacienteSelecionadoNome = '';

  ngOnInit() {
    this.carregarConsultas();
    this.carregarPacientes();
  }

  carregarConsultas() {
    this.consultaService.listar().subscribe(res => {
      this.consultas = res;
    });
  }

  carregarPacientes() {
    this.clienteService.listar().subscribe(res => {
      this.pacientes = res;
    });
  }

  salvar() {

    if (!this.dataConsulta) {
      alert('Selecione a data da consulta.');
      return;
    }

    if (!this.pacienteSelecionado) {
      alert('Selecione o paciente antes de salvar.');
      return;
    }

    const consulta: Consulta = {
      id: this.consultaEditandoId,
      dataConsulta: this.dataConsulta,
      observacoes: this.observacoes,
      paciente: {
        id: this.pacienteSelecionado
      }
    };

    if (this.consultaEditandoId) {
      this.consultaService.atualizar(consulta).subscribe(() => {
        this.carregarConsultas();
        this.limpar();
      });
    } else {
      this.consultaService.salvar(consulta).subscribe(() => {
        this.carregarConsultas();
        this.limpar();
      });
    }
  }

  editar(c: Consulta) {
    this.consultaEditandoId = c.id;
    this.dataConsulta = c.dataConsulta;
    this.observacoes = c.observacoes;
    this.pacienteSelecionado = c.paciente.id;
    this.pacienteSelecionadoNome = c.paciente.nome ?? '';
  }

  excluir(id: number) {
    const consulta = this.consultas.find(c => c.id === id);
    const dataFormatada = consulta ? this.formatarData(consulta.dataConsulta) : '';
    const nomePaciente = consulta?.paciente?.nome ?? 'paciente';

    const confirmado = confirm(
      `Tem certeza que deseja excluir a consulta de ${nomePaciente} do dia ${dataFormatada}? Essa ação não pode ser desfeita.`
    );

    if (!confirmado) {
      return;
    }

    this.consultaService.excluir(id).subscribe(() => {
      this.carregarConsultas();
    });
  }

  private formatarData(data: string): string {
    const [ano, mes, dia] = data.substring(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }

  limpar() {
    this.consultaEditandoId = undefined;
    this.dataConsulta = '';
    this.observacoes = '';
    this.pacienteSelecionado = 0;
    this.pacienteSelecionadoNome = '';
  }
}