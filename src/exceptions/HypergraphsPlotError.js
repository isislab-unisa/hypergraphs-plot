import HypergraphsPlotException from './HypergraphsPlotException';

export default class HypergraphsPlotError extends HypergraphsPlotException {
  constructor(message) {
    super(message);
    this.name = 'HypergraphsPlotError';
  }
}