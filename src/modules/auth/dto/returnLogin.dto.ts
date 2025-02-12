import { ApiProperty } from '@nestjs/swagger';

export class ReturnLoginDto {
  @ApiProperty({
    description: 'Access token',
    type: String,
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5ODg1OWE4LTRmZTMtNDkyNS1iZDhiLTdkMGRhMDE1N2IwYyIsInVzZXJuYW1lIjoiQmFkQm95MiIsImlhdCI6MTczOTM3MzQ4OCwiZXhwIjoxNzM5Mzc3MDg4fQ.-UjNrDuBXSuy_xyQM1UbarGcyJ7CNF5N6eVdMnfm5uE',
  })
  accessToken: string;
}
