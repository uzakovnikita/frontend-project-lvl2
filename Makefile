# Makefile

install:
	npm install
start:
	npx node bin/gendiff.js

publish:
	npm publish --dry-run
