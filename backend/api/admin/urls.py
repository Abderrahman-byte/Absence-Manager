from django.urls import path

from .views import AccountsAdminView, AccountAdminView, AccountAdminSearch

urlpatterns = [
    path('accounts', AccountsAdminView.as_view(), name='accounts_admin'),
    path('accounts/search', AccountAdminSearch.as_view(), name='account_search_admin'),
    path('accounts/<str:pk>', AccountAdminView.as_view(), name='account_admin'),
]