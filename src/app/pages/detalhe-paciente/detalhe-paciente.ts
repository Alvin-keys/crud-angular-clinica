import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ConsultaService, Consulta } from '../../services/consulta.service';
import { Cliente } from '../../models/cliente';
import { DataBrPipe } from '../../pipes/data-br.pipe';

@Component({
  selector: 'app-detalhe-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink, DataBrPipe],
  templateUrl: './detalhe-paciente.html',
  styleUrl: './detalhe-paciente.scss'
})
export class DetalhePacienteComponent {

  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);
  private consultaService = inject(ConsultaService);

  paciente?: Cliente;
  consultas: Consulta[] = [];
  carregando = true;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.clienteService.buscarPorId(id).subscribe(res => {
      this.paciente = res;
    });

    this.consultaService.buscarPorPaciente(id).subscribe(res => {
      this.consultas = this.ordenarPorData(res);
      this.carregando = false;
    });
  }

  private ordenarPorData(consultas: Consulta[]): Consulta[] {
    return [...consultas].sort((a, b) =>
      a.dataConsulta.localeCompare(b.dataConsulta)
    );
  }
}