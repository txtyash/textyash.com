# Compile source code and run
# Also run npm for tailwind
# -q: quiet, -c: clear screen, -w: dir to watch, -x: command
# cargo watch -c -x r -w src/ & # Without shuttle
npm run watch &
cargo watch -c -w src/ -x "shuttle run --port 8090" # With shuttle
