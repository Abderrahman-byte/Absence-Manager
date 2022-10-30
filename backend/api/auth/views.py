from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import AccountTokenObtainPairSerializer

class AccountTokenObtainPairView (TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

class AccountTokenRefreshView (TokenRefreshView):
    serializer_class = AccountTokenObtainPairSerializer