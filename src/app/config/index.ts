import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_secret_key: process.env.JWT_ACCESS_SECRETE,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRETE,
  jwt_access_time: process.env.JWT_ACCESS_TIME,
  jwt_refresh_time: process.env.JWT_REFRESH_TIME,
  jwt_resetUi_token: process.env.jwt_reset_ui_token,
};
