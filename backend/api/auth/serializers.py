from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AccountTokenObtainPairSerializer (TokenObtainPairSerializer):
    @classmethod
    def get_token (cls, user) :
        token = super().get_token(user)

        token['email'] = user.email
        token['is_admin'] = user.is_admin

        return token