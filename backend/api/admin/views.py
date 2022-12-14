from django.db.models import Q
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, APIException, bad_request
from rest_framework import viewsets

from backend.account.models import Account
from backend.modules.models import Departement, Faculty, Module, ModuleElement
from backend.account.serializers import AdminAccountSerializer
from backend.modules.serializers import DepartementSerializer, FacultySerializer, ModuleSerializer, ModuleElementSerializer
from backend.core.pagination import StandardResultsSetPagination
from backend.core.utils import get_errors_object
from backend.core.views import AdminOnlyAPIView
from backend.account.forms import AccountCreationForm
from backend.core.utils import view_set_to_crud, view_set_to_list_create
from backend.core.views import SearchMixins
from backend.core.utils import parse_excel, check_filetype
from backend.students.models import Student

# TODO : Add Logging actions

class AccountsAdminViewSet (AdminOnlyAPIView, viewsets.ModelViewSet):
    """
    View set for CRUD operations made by the admin."""

    serializer_class = AdminAccountSerializer
    pagination_class = StandardResultsSetPagination

    # TODO : generate random string as password and send it to user's email
    def create(self, request):
        form = AccountCreationForm(request.data)
    
        if not form.is_valid() :
            raise ValidationError(get_errors_object(form))

        account = form.save()
        return Response(self.serializer_class(account).data)

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

    # TODO : Order query_set for consistent pagination
    def get_queryset(self):
        return Account.objects.all()

# TODO : refactor
class AccountAdminSearch (AdminOnlyAPIView) :
    """
    View search for accounts."""

    min_count = 5

    def get(self, request, *args, **kwargs) :
        query = request.query_params['query']
        page_size = int(request.query_params.get('page_size', 10))
        admin_only = request.query_params.get('admin_only', False)
        words = query.split(' ')

        # Set page_size to min_count if less then 0
        if page_size <= 0 : page_size = self.min_count

        # Filter by exact email, first_name or last_name
        filters = Q(email=query) | Q(first_name=query) | Q(last_name=query)

        # Set admin only filter
        if admin_only : filters = Q(filters) & Q(is_admin=True)

        accounts = Account.objects.filter(filters)

        if len(accounts) >= self.min_count :
            return Response(AdminAccountSerializer(accounts, many=True).data)

        #  Filter by email, first_name or last_name (case incensitive)
        filters |= Q(first_name__iexact=query) | Q(last_name__iexact=query) | Q(email=query)
        

        if len(words) > 1 :
            for word in words :
                #  Filter by each word of the query
                filters |= Q(first_name__iexact=word)
                filters |= Q(last_name__iexact=word)

        if admin_only : filters = Q(filters) & Q(is_admin=True)

        accounts |= Account.objects.filter(filters)[:page_size - len(accounts)]

        if len(accounts) >= self.min_count :
            return Response(AdminAccountSerializer(accounts, many=True).data)

        #  Filter by email, first_name or last_name contains query
        filters |= Q(first_name__icontains=query)
        filters |= Q(last_name__icontains=query)

        if len(words) > 1 :
            for word in words :
                filters |= Q(first_name__icontains=word)
                filters |= Q(last_name__icontains=word)

        if admin_only : filters = Q(filters) & Q(is_admin=True)

        # Concatinate with previous results
        accounts |= Account.objects.filter(filters)[:page_size - len(accounts)]

        return Response(AdminAccountSerializer(accounts, many=True).data)


class DepartementsViewSets (AdminOnlyAPIView, viewsets.ModelViewSet, SearchMixins) :
    serializer_class = DepartementSerializer
    model_class = Departement

    def get_queryset(self):
        return Departement.objects.order_by('id').all()

class FacultyViewSets (AdminOnlyAPIView, viewsets.ModelViewSet, SearchMixins) :
    serializer_class = FacultySerializer
    model_class = Faculty

    def get_queryset(self):
        return Faculty.objects.order_by('id').all()

class ModuleViewSet (AdminOnlyAPIView, viewsets.ModelViewSet, SearchMixins) :
    serializer_class = ModuleSerializer
    pagination_class = StandardResultsSetPagination
    model_class = Module

    def get_queryset(self):
        return Module.objects.order_by('id').all()

class ModuleElementViewSet (AdminOnlyAPIView, viewsets.ModelViewSet) :
    serializer_class = ModuleElementSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return ModuleElement.objects.order_by('id').all()

class StudentsView (AdminOnlyAPIView) :
    def post(self, request, *args, **kwargs) :
        file = request.FILES.get('file')

        if not check_filetype(file, ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']) :
            raise APIException(detail='Unexpected file type.', code='unexpected_file')

        data = parse_excel(file)
        
        for row in data :
            faculty = Faculty.objects.get(short_name=row.pop('faculty_short_name')) 
            row['faculty'] = faculty
            student = Student(**row)
            student.save()
        
        return Response({})


accounts_list_create_view = view_set_to_list_create(AccountsAdminViewSet)
account_view = view_set_to_crud(AccountsAdminViewSet)

departements_list_create_view = view_set_to_list_create(DepartementsViewSets)
departement_view = view_set_to_crud(DepartementsViewSets)
departement_search = DepartementsViewSets.as_view({ 'get': 'search' })

faculty_list_create_view = view_set_to_list_create(FacultyViewSets)
faculty_view = view_set_to_crud(FacultyViewSets)
faculty_search = FacultyViewSets.as_view({ 'get': 'search' })

modules_list_create_view = view_set_to_list_create(ModuleViewSet)
module_view = view_set_to_crud(ModuleViewSet)
module_search = ModuleViewSet.as_view({ 'get': 'search' })

elements_list_create_view = view_set_to_list_create(ModuleElementViewSet)
element_view = view_set_to_crud(ModuleElementViewSet)
