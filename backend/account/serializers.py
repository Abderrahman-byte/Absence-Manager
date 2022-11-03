from rest_framework import serializers

class AccountSerializer (serializers.Serializer):
    id = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    is_admin = serializers.BooleanField(default=False, read_only=True)
