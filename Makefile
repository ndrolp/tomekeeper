.PHONY: dev prod build-prod

# Variables
SERVICE_NAME = tomekeeper

# Comandos
dev:
	docker compose -f docker-compose.dev.yml up

dev-dettached:
	docker compose -f docker-compose.dev.yml up -d

dev-run:
	docker compose -f docker-compose.dev.yml up --build 

build-dev:
	docker compose -f docker-compose.dev.yml build --no-cache

