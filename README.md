# Zoho Postgres Token Management

Module for getting [Zoho's Javascript SDK](https://www.zoho.com/crm/developer/docs/server-side-sdks/node-js.html) to save tokens to an [Amazon RDS](https://aws.amazon.com/rds/) postgres database.

Requires that the following environment variables be set:

```sh
DB_HOST=your-rds-hostname.rds.amazonaws.com
DB_DATABASE=postgres # may be different if you've created a different database
DB_USER=postgres # may be different if you've created a different superuser
DB_PASSWORD=MySuperSecretDBPassword
```
