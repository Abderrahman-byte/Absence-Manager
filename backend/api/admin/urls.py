from django.urls import path

from . import views

urlpatterns = [
    path('accounts', views.AccountsAdminView.as_view(), name='api_accounts_admin'),
    path('accounts/search', views.AccountAdminSearch.as_view(), name='api_account_search_admin'),
    path('accounts/<str:pk>', views.AccountAdminView.as_view(), name='api_account_admin'),

    path('departements', views.DepartementsCreateListView.as_view(), name='api_admin_departements'),
    path('departements/<int:pk>', views.DepartementRetrieveUpdateDestroy.as_view(), name='api_admin_departement'),
]