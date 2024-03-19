run: line
	npm run dev

lint: line
	prettier --check . && eslint .

format: line
	prettier --write .

line:
	@echo -e "--------------------------------------\n"
