from django.contrib import admin

from backend.students.models import Student

@admin.register(Student)
class StudentAdmin (admin.ModelAdmin) :
    list_display = ['cin', 'email', 'first_name', 'last_name', 'faculty']
