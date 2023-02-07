import {SchedulingProcess} from './components/SchedulingProcess';
import {CSVReader} from './utils/csvReader';

const csvReader = new CSVReader();
const process = new SchedulingProcess(csvReader);
process.start();
