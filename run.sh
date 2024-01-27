# Compile source code and run
# Also run npm for tailwind
# -q: quiet, -c: clear screen, -w: dir to watch, -x: command
cargo watch -q -c -w src/ -x "run" &
npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch
