import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DownloadLeagueCsvUseCase } from './DownloadLeagueCsvUseCase';

class DownloadLeagueCsvController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { leagueId, round } = request.params;

    const downloadLeagueCsvUseCase = container.resolve(DownloadLeagueCsvUseCase);

    const { csv, fileName } = await downloadLeagueCsvUseCase.execute(
      leagueId,
      Number(round),
    );

    response.header('Content-Type', 'text/csv');
    response.attachment(fileName);
    return response.send(csv);
  }
}

export { DownloadLeagueCsvController };
