import { IsOptional } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity({name: "log"})
class Log {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({default: "null"})
  @IsOptional()
  public context?: string;
  @Column({default: "null"})
  @IsOptional()
  public message?: string;
  @Column({default: "null"})
  @IsOptional()
  public level?: string;
  @Column({default: "null"})
  @IsOptional()
  public stack?: string;
  @CreateDateColumn()
  creationDate: Date;
}
 
export default Log;