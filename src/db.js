import { createPool } from 'mysql2/promise';

export const poll = createPool({
  host: 'bczsetqiyg8ogjwsob7o-mysql.services.clever-cloud.com',
  user: 'uj4m6mgrf8jfp0ua',
  password: 'Hea0AnzvUs7cR1DzH6yS',
  database: 'bczsetqiyg8ogjwsob7o',
  port: 3306,
})