from rest_framework.views import APIView
from rest_framework import permissions

class AuthenticatedOnlyViewAPI (APIView):
    permission_classes = [permissions.IsAuthenticated]