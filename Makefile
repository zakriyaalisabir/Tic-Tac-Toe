#	Make	targets	for	Mock	DataLake	Project

SHELL:=	/bin/bash

APP:=	tictactoe
REVISION:=	$(shell	git	rev-parse	--short	HEAD)
SCHEMA:=	${APP}
ORIGIN:=	master
TIMESTAMP := $(shell /bin/date "+%Y/%m/%d %H-%M-%S")
MSG:=	updated code @ ${TIMESTAMP}

.PHONY:	init

init:
	cp	".env.sample"	"./backend/.env"
	cp	".env.sample"	"./frontend/.env"

install:
	cd	backend/
	npm	i
	cd	..
	cd	frontend/
	npm	i
	cd	..

server.run:
	cd	backend/
	npm	run	start
	cd	..

app.run:
	pwd
	cd	frontend/
	npm	run	start

git_sync:
	git	fetch --all
	git	pull	origin ${ORIGIN}
	git	add	.
	git	commit	-m	"${MSG}"
	git	push	origin	${ORIGIN} 

all:install	app.run