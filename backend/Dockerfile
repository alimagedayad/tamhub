FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY . .

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
RUN pip install --no-cache-dir -r requirements.txt
# 
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod o+x /entrypoint.sh

EXPOSE 8000

# CMD ["gunicorn", "--bind", ":8000", "proj.wsgi"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT ["sh", "./entrypoint.sh"]
ENTRYPOINT ["sh", "-c", " /entrypoint.sh"]

# # pull official base image
# FROM python:3.8.3-alpine

# # set work directory
# WORKDIR /srv/app

# # set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # install dependencies
# RUN pip install --upgrade pip
# COPY ./requirements.txt .
# RUN apk add --update --no-cache postgresql-client
# # install temp dependencies for build of pyscopg2 etc
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
#   gcc \
#   libc-dev \
#   linux-headers \
#   postgresql-dev \
#   musl-dev \
#   zlib zlib-dev \
#   && pip install -r requirements.txt \
#   && apk del --no-cache .tmp-build-deps

# # copy entrypoint.sh
# COPY ./entrypoint.sh .

# # copy project
# COPY . .
# RUN chmod o+x /entrypoint.sh
# # run entrypoint.sh
# ENTRYPOINT ["/srv/app/entrypoint.sh"]
