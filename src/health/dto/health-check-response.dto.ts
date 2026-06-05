import { IsString, IsNumber, IsISO8601 } from 'class-validator';

export class HealthCheckResponseDto {
  @IsString()
  status: string;

  @IsNumber()
  uptime: number;

  @IsISO8601()
  timestamp: string;
}
