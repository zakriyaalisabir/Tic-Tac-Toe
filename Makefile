#	Make	Targets	For	TicTacToe	Project

SHELL:=	/bin/bash

APP:=	tictactoe
REVISION:=	$(shell	git	rev-parse	--short	HEAD)
SCHEMA:=	${APP}
ORIGIN:=	backend
TIMESTAMP := $(shell /bin/date "+%Y/%m/%d %H:%M:%S")
MSG:=	updated code @ ${TIMESTAMP}

postgres.install:
	@echo	"postgres init....."
	sudo	apt-get	install	wget	ca-certificates
	wget	--quiet	-O	-	https://www.postgresql.org/media/keys/ACCC4CF8.asc	|	sudo	apt-key	add	-
	sudo	sh	-c	'echo	"deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main"	>>	/etc/apt/sources.list.d/pgdg.list'
	sudo	apt-get	update
	sudo	apt-get	install	postgresql	postgresql-contrib

postgres.createdb:
	@echo	"DB init....."
	sudo	su	-	postgres	-c	"psql	-c	'SELECT * FROM pg_database WHERE datname = "${APP}"'"
	# CREATE	DATABASE	${APP};
	# psql
	# \connect	${APP}
	# CREATE	SCHEMA	${APP};
	\q
	exit

postgres.init:postgres.install	postgres.createdb

db:postgres.init
	@echo	"DB Ok"

run:
	cd	backend/	&&	npm	run	start

git_sync:
	git	fetch --all
	git	pull	origin ${ORIGIN}
	git	add	.
	git	commit	-m	"${MSG}"
	git	push	origin	${ORIGIN} 

all:run