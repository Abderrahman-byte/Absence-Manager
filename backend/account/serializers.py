from rest_framework import serializers

from backend.account.models import Account

class AccountSerializer (serializers.ModelSerializer):
    """Default serializer for :class:`Account`
    allows create,retreive and update.

    The fields id, email, is_admin are read only.
    
    See : :class:`AdminAccountSerializer`."""

    class Meta :
        model = Account
        fields = ['id', 'email', 'first_name', 'last_name', 'is_admin']
        read_only_fields = ['id', 'email', 'is_admin']

# TODO : change password
# TODO : Maybe find a solution to unify the two serializers with keeping permissions
class AdminAccountSerializer (serializers.ModelSerializer):
    """The same as the :class:`AccountSerializer` except that this 
    serializer gives the user to edit email and is_admin fields
    Must be used by admins only.
    """
    
    class Meta :
        model = Account
        fields = ['id', 'email', 'first_name', 'last_name', 'is_admin']
        read_only_fields = ['id']