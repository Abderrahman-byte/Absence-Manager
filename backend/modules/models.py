from django.db import models

from backend.account.models import Account

# TODO : Maybe add creation date to the departement

class Departement (models.Model) :
    name = models.CharField("name", unique=True, max_length=100)
    description = models.TextField("description", blank=True, null=True)

    head_of_departement = models.ForeignKey(
        Account, 
        verbose_name = "head of departement", 
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name

# Filiere
class Faculty (models.Model) :
    name = models.CharField("name", unique=True, max_length=100)
    short_name = models.CharField("short name", null=True, blank=True, max_length=100)
    description = models.TextField("description", blank=True, null=True)

    departement = models.ForeignKey(
        Departement,
        verbose_name="departement",
        null=True,
        blank=True,
        on_delete=models.SET_NULL # maybe be do cascade
    )

    class Meta :
        verbose_name = "Faculty"
        verbose_name_plural = "Faculties"

    def __str__(self):
        return self.short_name or self.name

class Module (models.Model) :
    name = models.CharField("name", max_length=100)
    description = models.TextField("description", blank=True, null=True)

    faculty = models.ForeignKey(
        Faculty,
        verbose_name="faculty",
        on_delete=models.CASCADE
    )

    class Meta :
        constraints = [
            models.UniqueConstraint(fields=['name', 'faculty'], name='unique_module_per_faculty')
        ]

    def __str__(self):
        return f'{self.faculty}: {self.name}'

class ModuleElement (models.Model) :
    name = models.CharField("name", max_length=100)
    description = models.TextField("description", blank=True, null=True)

    module = models.ForeignKey(
        Module,
        verbose_name="module",
        on_delete=models.CASCADE
    )

    professor = models.ForeignKey(
        Account,
        verbose_name="professor",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    class Meta :
        verbose_name = "element"
        verbose_name_plural = "elements"
        constraints = [
            models.UniqueConstraint(fields=['name', 'module'], name='unique_element_per_module')
        ]

    def __str__(self):
        return f'{self.module.faculty}: {self.module.name}/{self.name}'