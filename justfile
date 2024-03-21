run: line
	npm run dev

lint: line
	prettier --check . && eslint .

format: line
	prettier --write .

generate: line
	npm run generate

migrate: line
	npm run migrate

line:
	@echo -e "--------------------------------------\n"
