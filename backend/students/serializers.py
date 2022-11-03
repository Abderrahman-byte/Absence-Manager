from rest_framework import serializers

from .models import Student

class StudentSerializer (serializers.ModelSerializer):
    class Meta :
        model = Student
        fields = ['cin', 'first_name', 'last_name', 'email']
        read_only_fields = ['cin']