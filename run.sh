# Compile source code and run
# Also run npm for tailwind
# -q: quiet, -c: clear screen, -w: dir to watch, -x: command
# cargo watch -c -x r -w src/ & # Without shuttle
cargo watch -c -x "shuttle run" -w src/ & # With shuttle
npx tailwindcss -i static/css/input.css -o static/css/output.css --watch --minify
