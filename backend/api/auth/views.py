from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions

from backend.account.serializers import AccountSerializer 
from .serializers import AccountTokenObtainPairSerializer, AccountTokenRefreshSerializer

class AccountInfo (APIView):
    """
    View for authenticated account info."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None) :
        user = request.user
        accountInfo = AccountSerializer(user)

        return Response(accountInfo.data)

class AccountTokenObtainPairView (TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

class AccountTokenRefreshView (TokenRefreshView):
    serializer_class = AccountTokenRefreshSerializer