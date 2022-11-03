from datetime import timedelta

from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from backend.core.views import AuthenticatedOnlyViewAPI
from backend.modules.serializers import ElementStudentsAbsenceStat, ModuleElementSerializer, FacultySerializer, SimpleModuleElementSerializer
from backend.students.serializers import StudentSerializer
from backend.modules.models import Faculty, ModuleElement

# GET /api/teacher/elements
class TeacherElements(AuthenticatedOnlyViewAPI):
    def get(self, request, format=None):
        elements = request.user.moduleelement_set.all()
        elements_serializer = ModuleElementSerializer(elements, many=True)

        return Response(elements_serializer.data)

# GET /api/teacher/elements/:id/
class TeacherElementDetails(AuthenticatedOnlyViewAPI):
    def get(self, request, id, format=None):
        try :
            element = ModuleElement.objects.get(pk=id)
        except ModuleElement.DoesNotExist :
            raise Http404
        
        if element.professor != request.user :
            raise PermissionDenied

        element_stat = ElementStudentsAbsenceStat(element)
        return Response(element_stat.data)

# GET /api/teacher/faculty
class TeacherFaculties(AuthenticatedOnlyViewAPI):
    def get(self, request, format=None):
        account = request.user
        teacher_faculties = [elt.module.faculty for elt in account.moduleelement_set.select_related('module__faculty').distinct('module__faculty')]
        teacher_faculties_serializer = FacultySerializer(teacher_faculties, many=True)

        return Response(teacher_faculties_serializer.data)

# GET /api/teacher/faculty/:id
class TeacherFacultyDetails(AuthenticatedOnlyViewAPI):
    def get(self, request, id, format=None):
        account = request.user

        try :
            faculty = Faculty.objects.get(pk=id)
        except Faculty.DoesNotExist :
            raise Http404
        
        teacher_faculties = [elt.module.faculty for elt in account.moduleelement_set.select_related('module__faculty').distinct('module__faculty')]


        if faculty not in teacher_faculties :
            raise PermissionDenied

        faculty_data = FacultySerializer(faculty).data
        faculty_data['students'] = list()

        elements_in_faculty = account.moduleelement_set.filter(module__faculty=id)
        students = faculty.student_set.all()

        # for element in elements_in_faculty :
        #     element_data = SimpleModuleElementSerializer(element).data
        #     element_data['data'] = list()

        for student in students :
            student_data = StudentSerializer(student).data
            student_data['elements_absence'] = list()

            for element in elements_in_faculty :
                element_data = SimpleModuleElementSerializer(element).data
                student_element_absence = student.absence_set.filter(session__element=element.id)
                element_data['absence_hours'] = sum([ab.session.get_hours() for ab in student_element_absence])                
                element_data['justified_absence'] = sum([ab.session.get_hours() if ab.justified else 0 for ab in student_element_absence])
                student_data['elements_absence'].append(element_data)

        #     faculty_data['students'].append(student_data)

        return Response(faculty_data)

# GET /api/teacher/session
class TeacherSessions(AuthenticatedOnlyViewAPI):
    def get(self, request, format=None):
        return Response({'detail': 'NOT implemented'})