import {SchedulingProcess} from './components/SchedulingProcess';
import {ApiClient} from './utils/apiClient';
import {CSVReader} from './utils/csvReader';

const csvReader = new CSVReader();
const apiClient = new ApiClient();
const process = new SchedulingProcess(csvReader, apiClient);
process.start();
