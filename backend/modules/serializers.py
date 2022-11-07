from rest_framework import serializers

from backend.students.serializers import StudentSerializer

from backend.account.models import Account
from backend.account.serializers import AccountSerializer
from .models import ModuleElement, Module, Faculty, Departement

class DepartementSerializer (serializers.ModelSerializer) :
    head_of_departement = AccountSerializer(read_only=True)
    head_of_departement_id = serializers.CharField(write_only=True)

    class Meta :
        model = Departement
        fields = ['id', 'name', 'description', 'head_of_departement', 'head_of_departement_id']
        read_only_fields = ['id', 'head_of_departement']

    def create(self, validated_data):
        if 'head_of_departement_id' in validated_data :
            # Get account from head_of_departement_id field
            account_id = validated_data.pop('head_of_departement_id')
            account = Account.objects.get(pk=account_id)
            return Departement.objects.create(head_of_departement=account, **validated_data)
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'head_of_departement_id' in validated_data :
            account_id = validated_data.pop('head_of_departement_id')
            account = Account.objects.get(pk=account_id)
            instance.head_of_departement = account

        return super().update(instance, validated_data)


class FacultySerializer (serializers.ModelSerializer) :
    departement = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta :
        model = Faculty
        fields = ['id', 'name', 'short_name', 'description', 'departement']
        read_only_fields = ['id', 'departement']

class ModuleSerializer (serializers.ModelSerializer) :
    faculty = FacultySerializer(read_only=True)

    class Meta :
        model = Module
        fields = ['id', 'name', 'description', 'faculty']
        read_only_fields = ['id']

class ModuleElementSerializer (serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)

    class Meta :
        model = ModuleElement
        fields = ['id', 'name', 'description', 'module']
        read_only_fields = ['id']

class SimpleModuleElementSerializer (serializers.ModelSerializer):
    module = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta :
        model = ModuleElement
        fields = ['id', 'name', 'description', 'module']
        read_only_fields = ['id']

class ElementStudentsAbsenceStat (serializers.BaseSerializer) :
    def to_representation(self, instance) :
        data = ModuleElementSerializer(instance).data
        students = instance.module.faculty.student_set.all()

        data['students'] = list()

        for student in students :
            student_data = StudentSerializer(student).data
            element_student_absence = student.absence_set.filter(session__element=instance.id).all()
            student_data['absence_hours'] = sum([ab.session.get_hours() for ab in element_student_absence])
            student_data['justified_absence'] = sum([ab.session.get_hours() if ab.justified else 0 for ab in element_student_absence])
            data['students'].append(student_data)

        return data