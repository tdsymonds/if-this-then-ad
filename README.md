# If This Than Ad (Trigger Based Marketing)

## API for entities management
Supported entity names (`:entity`):
- user
- rule

In most methods you need to specify the entity ID (`:id`) which is a unique entity identifier.

For the api methods "Create" and "Update" you need to send the full entity object in the request body in the JSON format.

### API endpoints
|Action|Method|Endpoint|
|------|------|--------|
|Create new entity|POST|`/api/:entity/create/:id`|
|Update existing entity|PUT|`/api/:entity/update/:id`|
|Get entity|GET|`/api/:entity/get/:id`|
|Delete entity|DELETE|`/api/:entity/delete/:id`|
|List all entities|GET|`/api/:entity/list`|

## Development

### Git: Pre commit
To do all the checks before the commit automatically please add the [git/pre-commit](git/pre-commit) to your `.git/hooks/` directory.

To run all chacks manually you can execute the following code from the project root `npm run pre-commit`.
