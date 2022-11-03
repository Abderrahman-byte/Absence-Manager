from django.urls import path

from .views import (
    TeacherElements, 
    TeacherElementDetails, 
    TeacherFaculties, 
    TeacherFacultyDetails, 
    TeacherSessions
)

urlpatterns = [
    path('elements', TeacherElements.as_view(), name='teacher_elements'),
    path('elements/<int:id>', TeacherElementDetails.as_view(), name='teacher_element_details'),
    path('faculty', TeacherFaculties.as_view(), name='teacher_faculties'),
    path('faculty/<int:id>', TeacherFacultyDetails.as_view(), name='teacher_faculty_details'),
    path('sessions', TeacherSessions.as_view(), name='teacher_sessions')
]