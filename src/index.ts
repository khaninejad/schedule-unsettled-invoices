import {SchedulingProcess} from './components/SchedulingProcess';
import {ApiClient} from './utils/apiClient';
import {CSVReader} from './utils/csvReader';

/**
 * this script is the entry point of the app which will execute the process
 * improvement: ideally should be run on a scheduled task like cron jobs, it is optimized to not run over than queue list
 */
const csvReader = new CSVReader();
const apiClient = new ApiClient();
const process = new SchedulingProcess(csvReader, apiClient);
process.start();
