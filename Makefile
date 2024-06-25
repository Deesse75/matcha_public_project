all:
	docker-compose up --build

down:
	docker-compose down --rmi all

fclean: down
	docker system prune -af

dev:
	docker-compose -f docker-compose-dev.yml up --build

dev_down:
	docker-compose -f docker-compose-dev.yml down --rmi all


re: fclean all
