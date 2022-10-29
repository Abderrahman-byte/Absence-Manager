from django.db import models

from backend.modules.models import ModuleElement
from backend.students.models import Student

class StudySession (models.Model) :
    date = models.DateField("date")
    start_at = models.TimeField("starts at")
    end_at = models.TimeField("ends at")

    element = models.ForeignKey(
        ModuleElement,
        verbose_name="element",
        on_delete=models.CASCADE        
    )

    class Meta :
        constraints = [
            models.UniqueConstraint(fields=['element', 'date', 'start_at'], name='one_session_starts_at_a_time'),
            models.CheckConstraint(check=models.Q(end_at__gt=models.F('start_at')), name='check_start_time')
        ]

    def __str__(self):
        return f"{str(self.element.module.faculty)} - {self.element.name} - {self.date} from {self.start_at} to {self.end_at}"


class Absence (models.Model) :
    justified = models.BooleanField("justified", default=False)
    session = models.ForeignKey(StudySession, verbose_name="session", on_delete=models.CASCADE)
    student = models.ForeignKey(Student, verbose_name="student", on_delete=models.CASCADE)

    class Meta :
        constraints = [
            models.UniqueConstraint(fields=['session', 'student'], name="UNIQUE_session_student")
        ]
