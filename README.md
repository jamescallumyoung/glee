# Glee

Glee is a JavaScript package that provides Express middleware for request and response validation.

The middleware uses Joi - the popular Hapi-ecosystem validation library - for validation and validates request path params, query params, headers, and body, and the response headers and body.

Glee aims to provide a Hapi-like validation experience for the Express ecosystem.

**[Full Documentation](https://jamescallumyoung.github.io/glee/)**

## Installation

Install using yarn:

```bash
yarn add @jych/glee
```

or npm:
```bash
npm install @jych/glee
```

## Example Usage

Using Glee is as simple as creating a Glee instance and then passing a Joi Schema to one of it's "get validator" methods. The result is an Express Middleware.

```typescript
import express, { Request, Response } from 'express'
import { Glee } from '@jych/glee'
import Joi from '@hapi/joi';

const schema = Joi.object();

const glee = new Glee();
const queryValidatorMw = glee.getQueryValidator(schema);

const app = express();

app.get(
	'/',
	queryValidatorMw,
	(req: Request, res: Response) => {
		res.status(200).send('Hello world!');
	}
);
```

## Contributing
Pull requests are welcome. Please report issues on the [issue traker](https://github.com/jamescallumyoung/glee/issues).

## License
Glee uses the [MIT license](https://github.com/jamescallumyoung/glee/blob/master/LICENSE).

