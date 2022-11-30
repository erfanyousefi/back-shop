import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class LogDTO {
  public errorDetail?: unknown
  public requestDetail?: object;
  public errorLocation?:object;
}
 
export default LogDTO;