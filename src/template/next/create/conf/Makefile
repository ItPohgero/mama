COMPOSE_FILE := docker/compose.yaml

.PHONY: docker-build docker-start docker-stop docker-logs docker-check docker-restart

docker-build: ## Build the Docker image.
	docker compose -f $(COMPOSE_FILE) build

docker-start: ## Start the Docker containers.
	docker compose -f $(COMPOSE_FILE) up -docker-d

docker-stop: ## Stop and remove the Docker containers.
	docker compose -f $(COMPOSE_FILE) docker-down

docker-logs: ## Show logs of the running Docker containers.
	docker compose -f $(COMPOSE_FILE) logs -f

docker-check: ## Check the health of the Docker containers
	docker compose -f $(COMPOSE_FILE) ps

docker-restart: ## Rebuild and restart the application completely.
	@echo "Removing all unused containers, images, volumes, and networks..."
	docker container prune -f
	docker image prune -a -f
	docker volume prune -f
	docker network prune -f
	
	@echo "Stopping and removing existing containers..."
	docker compose -f $(COMPOSE_FILE) down --rmi all
	
	@echo "Rebuilding the application..."
	docker compose -f $(COMPOSE_FILE) build
	
	@echo "Starting the application..."
	docker compose -f $(COMPOSE_FILE) up -d

# PM2
PM2_CONFIG := pm2/pm2.config.yml
.PHONY: pm2-build pm2-start pm2-stop pm2-restart pm2-logs pm2-status pm2-deploy pm2-clean

pm2-build: ## Build the application using Bun
	@echo "Building the application with Bun..."
	bun install
	bunx prisma generate
	bun run build

pm2-start: ## Start the application with PM2
	@echo "Starting the application with PM2..."
	pm2 start $(PM2_CONFIG) --env production

pm2-stop: ## Stop the application with PM2
	@echo "Stopping the application with PM2..."
	pm2 stop $(PM2_CONFIG)

pm2-restart: ## Restart the application with PM2
	@echo "Restarting the application with PM2..."
	pm2 restart $(PM2_CONFIG) --env production

pm2-logs: ## Show logs of the application managed by PM2
	@echo "Showing logs of the application..."
	pm2 logs $(PM2_CONFIG)

pm2-status: ## Show the status of the application managed by PM2
	@echo "Checking the status of the application..."
	pm2 status $(PM2_CONFIG)

pm2-deploy: stop clean build start ## Clean, build, and restart the application
	@echo "Deploy process completed successfully."
