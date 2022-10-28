from django.contrib import admin

from backend.modules.models import Departement, Faculty, Module, ModuleElement

@admin.register(Departement)
class DepartementAdmin (admin.ModelAdmin) :
    list_display = ['name', 'description', 'head_of_departement']


@admin.register(Faculty)
class FacultyAdmin (admin.ModelAdmin) :
    list_display = ['name', 'short_name', 'departement']

@admin.register(Module)
class ModuleAdmin (admin.ModelAdmin) :
    list_display = ['name', 'description', 'faculty']

@admin.register(ModuleElement)
class ModuleElementAdmin (admin.ModelAdmin) :
    list_display = ['name', 'description', 'module', 'professor']
