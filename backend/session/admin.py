from django.contrib import admin

from backend.session.models import StudySession, Absence

@admin.register(StudySession)
class StudySessionAdmin (admin.ModelAdmin):
    list_display = ['element', 'date','start_at','end_at']

@admin.register(Absence)
class Absence (admin.ModelAdmin):
    list_display = ['session', 'student', 'justified']