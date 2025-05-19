.PHONY: dev prod build-prod

# Variables
SERVICE_NAME = tomekeeper

# Comandos
dev:
	docker compose -f docker-compose.dev.yml up

dev-dettached:
	docker compose -f docker-compose.dev.yml up -d

dev-run:
	docker compose -f docker-compose.dev.yml up --build $1 $2 $2

build-dev:
	docker compose -f docker-compose.dev.yml build

