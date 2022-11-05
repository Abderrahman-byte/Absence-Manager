from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from rest_framework import serializers

from backend.account.models import Account

class AccountSerializer (serializers.ModelSerializer):
    class Meta :
        model = Account
        fields = ['id', 'email', 'first_name', 'last_name', 'is_admin']
        read_only_fields = ['id', 'email', 'is_admin']

"""
NOTE : This Serializer is the same as the other except that this 
Serializer gives the user to edit email and is_admin fields
Must be used by admins only.
Maybe find a solution to unify the two with keeping permission stuff
"""
# TODO : change password
class AdminAccountSerializer (serializers.ModelSerializer):
    class Meta :
        model = Account
        fields = ['id', 'email', 'first_name', 'last_name', 'is_admin']
        read_only_fields = ['id']