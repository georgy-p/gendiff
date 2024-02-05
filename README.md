# Gendiff

[![Actions Status](https://github.com/georgy-p/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/georgy-p/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/203bfb8ebcf849dca3ea/maintainability)](https://codeclimate.com/github/georgy-p/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/203bfb8ebcf849dca3ea/test_coverage)](https://codeclimate.com/github/georgy-p/frontend-project-lvl2/test_coverage)

## About

Gendiff is a CLI application that displays the differences between two data structures.

## Options

- Supported formats: `.yaml`, `.yml` and `.json`.
- Representing output as *plain text, stylish* and *JSON*.
- You can specify only file names instead of full path.

## Examples

### Plain text report

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### Stylish report

```text
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### JSON report

```JSON
[{"key":"common","type":"nest","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"deleted"},{"key":"setting3","value":null,"previousValue":true,"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","type":"nest","children":[{"key":"doge","type":"nest","children":[{"key":"wow","value":"so much","previousValue":"","type":"changed"}]},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]}]},{"key":"group1","type":"nest","children":[{"key":"baz","value":"bars","previousValue":"bas","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":"str","previousValue":{"key":"value"},"type":"changed"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"type":"added"}]
```

## Video demo

[![asciicast](https://asciinema.org/a/444854.svg)](https://asciinema.org/a/444854)

## How to install

1. Clone the repository using the following command `$ git clone https://github.com/georgy-p/gendiff`.
2. In the root directory: `$ make install`.

## Usage

1. In the app directory run `$ gendiff file1.yaml file2.yaml`. You don't need to write full file path. App will recursively find needed files.
2. The default report format is *stylish*.
3. If you want to change report format to *JSON* or *plain text*  use `-f` and `plain` for plain text or `json` for JSON after `$ gendiff`.
For example: `$ gendiff -f plain /filepath1.yaml /filepath2.yaml`.
