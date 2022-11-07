from rest_framework.permissions import IsAuthenticated

class IsAdmin (IsAuthenticated) :
    """
    Allow acces only if the account has the is_admin set to True."""
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_admin