![apollo deprecated highlight](https://github.com/alexxiyang/apollo-deprecated-highlight/raw/main/adh_logo.png?raw=true)


[![circleci](https://circleci.com/gh/alexxiyang/apollo-deprecated-highlight.svg?style=shield)](https://github.com/alexxiyang/apollo-deprecated-highlight)
[![codecov](https://codecov.io/gh/alexxiyang/apollo-deprecated-highlight/branch/main/graph/badge.svg?token=C4ABZ0U011)](https://codecov.io/gh/alexxiyang/apollo-deprecated-highlight)
[![Known Vulnerabilities](https://snyk.io/test/github/alexxiyang/apollo-deprecated-highlight/badge.svg)](https://snyk.io/test/github/alexxiyang/apollo-deprecated-highlight)

Highlight the apollo graphql deprecated fields.

We know that even you mark a field in apollo-server as `@deprecated` the client-side won't be able to know it until execute introspection queries. This package is for showing the deprecations in the response so that the engineers can know which fields are deprecated when they are developing.

> **_NOTE:_**  This package is only for [apollo 4](https://www.npmjs.com/package/@apollo/server). If you are using apollo 3 please use [apollo3-deprecated-highlight](https://www.npmjs.com/package/apollo3-deprecated-highlight)

## How to use

```
import { ApolloDeprecatedHighlight } from 'apollo-deprecated-highlight';

// add ApolloDeprecatedHighlight() as plugin
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloDeprecatedHighlight()],
    ...
});
```
Then it will add `deprecations` to `extensions` of graphql respons. The response format will be

```
{
    "data": {...},
    "extensions": {
        "deprecations": [
            <deprecation1>,
            <deprecation2>,
            ...
        ]
    }
}
```
## Example

Here is the [example project](https://github.com/alexxiyang/apollo-deprecated-highlight-demo)

We mark `title`, `author` and `make` as deprecated fields in the schema
```
type Book {
    title: String @deprecated(reason:"title is deprecated. Dont't use it")
    author: String @deprecated(reason:"author is deprecated. Dont't use it")
}

type Car {
    make: String @deprecated(reason:"make is deprecated. Dont't use it")
    model: String
}
```
You will see the deprecations in the response
![response example](https://github.com/alexxiyang/apollo-deprecated-highlight/raw/main/resp_example.png)

Here is the response
```
"data": {...}
"extensions": {
    "deprecations": [
      {
        "field": "title",
        "reason": "title is deprecated. Dont't use it"
      },
      {
        "field": "author",
        "reason": "author is deprecated. Dont't use it"
      },
      {
        "field": "make",
        "reason": "make is deprecated. Dont't use it"
      }
    ]
  }
```
