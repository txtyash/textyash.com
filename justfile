watch:
	watchexec -r just run

tailwind:
	bun tailwindcss -i static/css/input.css -o static/css/output.css --minify
	@echo -e "--------------------------------------\n"

check:
	cargo check
	@echo -e "--------------------------------------\n"

run port='8000': check tailwind
	cargo shuttle run --port {{port}}

test:
	watchexec -r cargo test

copy:
	cp node_modules/marked/marked.min.js static/js/marked.min.js
	cp node_modules/htmx.org/dist/htmx.min.js static/js/htmx.min.js
	cp node_modules/easymde/dist/easymde.min.js static/js/easymde.min.js
