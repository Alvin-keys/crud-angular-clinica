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

  private chaveRascunho = 'consulta_rascunho';

  consultas: Consulta[] = [];
  pacientes: Cliente[] = [];

  dataConsulta = '';
  observacoes = '';
  pacienteSelecionado!: number;

  consultaEditandoId?: number;
  pacienteSelecionadoNome = '';

  rascunhoRestaurado = false;

  ngOnInit() {
    this.carregarConsultas();
    this.carregarPacientes();
    this.restaurarRascunho();
  }

  carregarConsultas() {
    this.consultaService.listar().subscribe(res => {
      this.consultas = this.ordenarPorDataDesc(res);
    });
  }

  private ordenarPorDataDesc(consultas: Consulta[]): Consulta[] {
    return [...consultas].sort((a, b) =>
      b.dataConsulta.localeCompare(a.dataConsulta)
    );
  }

  carregarPacientes() {
    this.clienteService.listar().subscribe(res => {
      this.pacientes = res;
    });
  }

  restaurarRascunho() {
    const rascunho = localStorage.getItem(this.chaveRascunho);
    if (!rascunho) {
      return;
    }

    const dados = JSON.parse(rascunho);
    if (dados.observacoes) {
      this.dataConsulta = dados.dataConsulta ?? '';
      this.observacoes = dados.observacoes ?? '';
      this.pacienteSelecionado = dados.pacienteSelecionado ?? 0;
      this.rascunhoRestaurado = true;
    }
  }

  salvarRascunho() {
    if (this.consultaEditandoId) {
      return;
    }

    localStorage.setItem(this.chaveRascunho, JSON.stringify({
      dataConsulta: this.dataConsulta,
      observacoes: this.observacoes,
      pacienteSelecionado: this.pacienteSelecionado
    }));
  }

  limparRascunho() {
    localStorage.removeItem(this.chaveRascunho);
    this.rascunhoRestaurado = false;
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

    const acao = this.consultaEditandoId
      ? this.consultaService.atualizar(consulta)
      : this.consultaService.salvar(consulta);

    acao.subscribe({
      next: () => {
        this.carregarConsultas();
        this.limparRascunho();
        this.limpar();
      },
      error: (erro) => {
        this.mostrarErro(erro);
      }
    });
  }

  private mostrarErro(erro: any) {
    if (erro.status === 400 && erro.error) {
      const mensagens = Object.values(erro.error).join('\n');
      alert(`Corrija os seguintes campos:\n${mensagens}`);
    } else if (erro.error?.mensagem) {
      alert(erro.error.mensagem);
    } else {
      alert('Ocorreu um erro ao salvar. Tente novamente.');
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
    this.rascunhoRestaurado = false;
  }
}