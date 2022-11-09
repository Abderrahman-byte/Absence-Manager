from rest_framework import serializers

from backend.students.serializers import StudentSerializer

from backend.account.models import Account
from backend.account.serializers import AccountSerializer
from .models import ModuleElement, Module, Faculty, Departement

class DepartementSerializer (serializers.ModelSerializer) :
    head_of_departement = AccountSerializer(read_only=True)
    head_of_departement_id = serializers.CharField(write_only=True, allow_null=True)

    class Meta :
        model = Departement
        fields = ['id', 'name', 'description', 'head_of_departement', 'head_of_departement_id']
        read_only_fields = ['id', 'head_of_departement']

    def create(self, validated_data):
        if validated_data.get('head_of_departement_id') is not None :
            account_id = validated_data.pop('head_of_departement_id')
            account = Account.objects.get(pk=account_id)
            validated_data['head_of_departement'] = account
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'head_of_departement_id' in validated_data :
            account_id = validated_data.pop('head_of_departement_id')
            account = Account.objects.get(pk=account_id) if account_id is not None else None
            instance.head_of_departement = account

        return super().update(instance, validated_data)


class FacultySerializer (serializers.ModelSerializer) :
    departement_id = serializers.IntegerField(write_only=True)
    departement = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta :
        model = Faculty
        fields = ['id', 'name', 'short_name', 'description', 'departement', 'departement_id']
        read_only_fields = ['id', 'departement']
        write_only_fields = ['departement_id']

    def create(self, validated_data):
        if validated_data.get('departement_id') is not None :
            departement_id = validated_data.pop('departement_id')
            departement = Departement.objects.get(pk=departement_id)
            validated_data['departement'] = departement
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'departement_id' in validated_data :
            departement_id = validated_data.pop('departement_id')
            instance.departement = Departement.objects.get(pk=departement_id) if departement_id is not None else None

        return super().update(instance, validated_data)

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