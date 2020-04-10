#	Make	targets	for	Mock	DataLake	Project

SHELL:=	/bin/bash

APP:=	tictactoe
REVISION:=	$(shell	git	rev-parse	--short	HEAD)
SCHEMA:=	${APP}
ORIGIN:=	backend
TIMESTAMP := $(shell /bin/date "+%Y/%m/%d %H-%M-%S")
MSG:=	updated code @ ${TIMESTAMP}

db:
	@echo	"hello from db"

run:
	cd	backend/	&&	npm	run	start

git_sync:
	git	fetch --all
	git	pull	origin ${ORIGIN}
	git	add	.
	git	commit	-m	"${MSG}"
	git	push	origin	${ORIGIN} 

all:run