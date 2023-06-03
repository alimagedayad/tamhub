# Generated by Django 4.2.1 on 2023-06-03 15:51

import django.contrib.postgres.fields
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('numbers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=11), default=list, size=None)),
            ],
        ),
    ]