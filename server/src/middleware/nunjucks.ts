import path from 'path';

import nunjucks from 'koa-nunjucks-async';
import njDateFilter from 'nunjucks-date-filter';

import config from '../server.config.json';
import * as njFilters from '../utils/njk-filters';

njDateFilter.setDefaultFormat(config.defaultDateFormat);

const nunjucksMiddleware = nunjucks(path.join(__dirname, '..', '..', 'views'), {
  ext: '.njk',
  opts: { noCache: !(process.env.NODE_ENV == 'production') },
  filters: {
    date: njDateFilter,
    ...njFilters,
  },
  globals: { NODE_ENV: process.env.NODE_ENV },
});

export default nunjucksMiddleware;
