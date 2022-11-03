from rest_framework.views import APIView
from rest_framework import permissions

from backend.core.permissions import IsAdmin

class AuthenticatedOnlyViewAPI (APIView):
    permission_classes = [permissions.IsAuthenticated]

class AdminOnlyAPIView (APIView) :
    permission_classes = [IsAdmin]