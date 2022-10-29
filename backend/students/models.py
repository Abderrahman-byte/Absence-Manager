from django.db import models

from backend.core.models import Person
from backend.modules.models import Faculty

class Student (Person) :
    cin = models.CharField("CIN", primary_key=True, max_length=15)
    faculty = models.ForeignKey(
        Faculty,
        verbose_name="Faculty",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
