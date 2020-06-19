# Sample table made with svelte solely for demonstration purposes

## Introduction

The goal of this project is to show my front-end skills in the domain of creating modern, customisable tables equipped with sorting and pagination.

## Installation

First, let's git clone this project into some local directory

```bash
git clone https://github.com/audiomancer/react-domless-media.git
```

Then, the dependencies must be installed

```bash
npm install
```

After project was set up and is ready to go, run:

- `npm run dev` - for creating dev bundle and starting dev server, which auto-reloads after each build change
- `npm run build` - for creating production ready build
- `npm run start` - for starting production server, after production bundle is ready

## Working principles

The table fetches sample company data from first mock url, then uses each entry id field to fech income data from another mock url, and then "joins" both collections using id as the equivalent of SQL's "primary key" for income data.

Then comes further processing in which some math is applied (total sum, average, finding last month's entry value) and then sorting and pagination at the end.

## Usage

Clicking on the column headers will sort the table by the specified element. Clicking the chevron facing down opens the search menu. Search in string type fields is case insensitive and is done by comparing the overlapping of the first characters of the searched item with the first characters from the given value, one by one, so e.g. writing "la" in the "city" field will return all entries that starts with "la". Search in number type fields is done by min or max value, or both. The search results from all fields are consecutively narrowing each other, thus giving the possibility to make detailed searches by many factors at once.

## Used tech

- Svelte (with svelte-spa-router)
- Axios
- Sirv
- Rollup
- Scss (with autoprefixer)
- Prettier

## Enjoy preview at:

https://audiomancer.github.io/Sample-table-made-with-svelte/