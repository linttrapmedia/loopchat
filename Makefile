# Basic Makefile

.PHONY: build clean

build:
	@echo "Building project..."
	cat lib/*.js > dist/loopchat.1.0.0.js

clean:
	@echo "Cleaning up..."
	rm -rf dist

dev:
	@echo "Opening dist/loopchat.js..."
	@echo "Starting local server..."
	@echo "Open http://localhost:8080 in your browser"
	@echo "Press Ctrl+C to stop the server"
	http-server ./
	open http://localhost:8080