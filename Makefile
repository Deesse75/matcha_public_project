all:
	docker-compose up --build

down:
	docker-compose down --rmi all

fclean: down
	docker system prune -af

re: fclean all
