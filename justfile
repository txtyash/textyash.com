watch:
	watchexec -r just run

line:
	@echo -e "--------------------------------------\n"

run: line
	cargo run

test:
	watchexec -r cargo test
