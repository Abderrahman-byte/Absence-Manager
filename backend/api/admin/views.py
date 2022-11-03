from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, MethodNotAllowed, APIException

from backend.account.models import Account
from backend.account.serializers import AdminAccountSerializer
from backend.core.pagination import StandardResultsSetPagination
from backend.core.utils import get_errors_object
from backend.core.views import AdminOnlyAPIView
from backend.account.forms import AccountCreationForm

# TODO : CRUD Departements
# TODO : Add Logging actions

class AccountsAdminView (AdminOnlyAPIView, ListCreateAPIView):
    serializer_class = AdminAccountSerializer
    queryset = Account.objects.all()
    pagination_class = StandardResultsSetPagination

    # TODO : generate random string as password and send it to user's email
    def create(self, request):
        form = AccountCreationForm(request.data)
    
        if not form.is_valid() :
            raise ValidationError(get_errors_object(form))

        account = form.save()
        return Response(self.serializer_class(account).data)

class AccountAdminView (AdminOnlyAPIView, RetrieveUpdateDestroyAPIView) :
    serializer_class = AdminAccountSerializer
    queryset = Account.objects.all()

    def patch(self, request, *args, **kwargs):
        if request.user == self.get_object() and 'is_admin' in request.data and not request.data.get('is_admin'):
            raise APIException("You cannot revoke admin priviledge from you account.", "operation_denied")

        return super().patch(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if self.get_object() == request.user :
            raise APIException("You cannot delete your own account.", "operation_denied")
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user == self.get_object() and not request.data.get('is_admin'):
            raise APIException("You cannot revoke admin priviledge from you account.", "operation_denied")

        return super().update(request, *args, **kwargs)
