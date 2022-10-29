from django.db import models

class Person (models.Model) :
    email = models.EmailField("email", max_length=150, unique=True)
    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)

    class Meta:
        abstract = True

    def get_full_name(self):
        full_name = f"{self.last_name} {self.first_name}"
        return full_name.strip()

    def __str__(self):
        return self.get_full_name()
