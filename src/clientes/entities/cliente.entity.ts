import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes', { schema: 'public' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'cli_id' })
  cliId: number;

  @Column({ name: 'cli_nombre' })
  cliNombre: string;  // Cambiado a `string`

  @Column({ name: 'cli_apellido' })
  cliApellido: string;  // Cambiado a `string`

  @Column({ name: 'cli_activo' })
  cliActivo: boolean;

  @Column({ name: 'cli_fecha_creacion' })
  cliFechaCreacion: Date;

  @Column({ name: 'cli_compras' })
  cliCompras: number;  // Cambiado a `number`
}
