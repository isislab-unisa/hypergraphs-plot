import HypergraphsPlotException from './HypergraphsPlotExeption';

export default class HypergraphsPlotError extends HypergraphsPlotException {
  constructor(message) {
    super(message);
    this.name = 'HypergraphsPlotError';
  }
}