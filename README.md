# Date-picker

Usual date-picker component for react applications

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm i date-picker-is
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add date-picker-is
```

You’ll need to install ```react```, ```react-dom``` and ```styled-components``` separately since those dependencies aren’t included in the package


## Configuration

Basic usage looks like this:
```js
<DateInput date={date} onChange={onChange} title="Date" />
```

You can also specify such parameters as:
- min - to set the minimum allowed date
- max - to set the maximum allowed date
- from - to set range start date 
- to - to set range end date 
- disableClear - to prevent clearing input date on cross or "clear" btn click