import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField()
    numbers = ArrayField(
        models.CharField(
            max_length=11, 
            blank=False
        ), blank=False, default=list
    )