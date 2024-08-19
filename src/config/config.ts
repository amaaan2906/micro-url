import dotenvExtended from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'

const env = dotenvExtended.load({
  path: `src/config/.env.${process.env.APP_ENV}`,
  defaults: 'src/config/.env.defaults',
  schema: 'src/config/.env.schema',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
})

const parsed_env = dotenvParseVariables(env)

interface Config {
  morgan: boolean
  dev_logger: boolean
  port: number
  mongo_id: string
  mongo_pwd: string
  mongo_uri: string
  private_route: string
  database_type: string
}

const config: Config = {
  morgan: parsed_env.MORGAN_LOGGER as boolean,
  dev_logger: parsed_env.DEV_LOGGER as boolean,
  port: parsed_env.PORT as number,
  mongo_id: parsed_env.MONGO_ID as string,
  mongo_pwd: parsed_env.MONGO_PWD as string,
  mongo_uri: parsed_env.MONGO_URI as string,
  private_route: parsed_env.PRIVATE_ROUTE as string,
  database_type: parsed_env.DATABASE_TYPE as string,
}

export default config
