const ZCRMRestClient = require('zcrmsdk')
const fs = require('mz/fs')
var path = require('path')
const pgp = require('pg-promise')({});
const {ParameterizedQuery: PQ} = require('pg-promise');

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env

const connection = {
  host: DB_HOST,
  port: DB_PORT || 5432,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(__dirname, 'db', 'rds-ca-2019-root.pem')).toString()
  }
}

const pg = pgp(connection);

saveOAuthTokens = tokenobject => db.updateOAuthTokens(tokenobject)

getOAuthTokens = async user_identifier => {
  const findToken = new PQ({text: 'select * from auth where user_identifier = $1', values: [user_identifier]})
  const token = await pg.one(findToken)
  return token
}

updateOAuthTokens = async tokenobject => {
  const userIdentifier = ZCRMRestClient.getUserIdentifier()
  const {access_token, refresh_token, expires_in } = tokenobject
  const updateToken = new PQ({text: `
    insert into auth(access_token, refresh_token, expires_in, user_identifier)
    values ($1, $2, $3, $4)
    on conflict (user_identifier)
      do update set (access_token, expires_in) = (EXCLUDED.access_token, EXCLUDED.expires_in)`,
  values: [access_token, refresh_token, expires_in, userIdentifier]})
  await pg.none(updateToken)
}

module.exports = {
  saveOAuthTokens,
  getOAuthTokens,
  updateOAuthTokens
}
