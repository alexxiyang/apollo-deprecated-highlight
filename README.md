# apollo-deprecated-highlight
Highlight the apollo graphql deprecated fields

It add `deprecations` to `extensions` of graphql response like this
```
"extensions":
    {
        "deprecations":
        [
            {
                "field": "timerange",
                "reason": "timerange is retired. Please use timerangeInSecond"
            },
            {
                "field": "height",
                "reason": "height is retired. Please use heightInCM"
            },
        ]
    }
```
