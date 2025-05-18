.PHONY: dev prod build-prod

# Variables
SERVICE_NAME = tomekeeper

# Comandos
dev:
	docker compose -f docker-compose.dev.yml up --build $1 $2 $2

