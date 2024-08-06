# prettier-plugin-fw2

A plugin for extending the HTML formatter of [Prettier](https://prettier.io/docs/en/plugins) to format HTML files containing syntax of the [FW2](https://github.com/Frachtwerk) framework.

## Get started

Install this package:

```bash
npm install -D @devmount/prettier-plugin-fw2
```

Add the plugin to your [Prettier config file](https://prettier.io/docs/en/configuration).

```json
{
  "plugins": ["@devmount/prettier-plugin-fw2"]
}
```

## Formatter

Using this plugin provides formatting for FW2's template markers for conditionals (`{!`, `!}`) and variables (`{_a_}`, `{_b:raw_}`).
It formats only HTML files, but includes embedded JS.

This repo contains a misformatted [example HTML file](./example.html), you can test this plugin by running:

```bash
npm run example
```
