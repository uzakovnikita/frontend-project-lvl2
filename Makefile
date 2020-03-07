# Makefile

install:
	npm install
start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run
lint:
	npx eslint .
build:
	npm run build
test:
	npm test
test-coverage:
	npm test -- --coverage
