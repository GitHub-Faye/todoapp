from django.db import models

# Create your models here.
class When(models.Model):
    when = models.IntegerField()
    where = models.CharField(max_length=30)


    def __str__(self) -> str:
        return f'{self.when} day we are in {self.where}'