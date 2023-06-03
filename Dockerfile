FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

# CMD ["gunicorn", "--bind", ":8000", "proj.wsgi"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]