from django.urls import path

from . import views

urlpatterns = [
    path('accounts', views.accounts_list_create_view, name='api_accounts_admin'),
    path('accounts/search', views.AccountAdminSearch.as_view(), name='api_account_search_admin'),
    path('accounts/<str:pk>', views.account_view, name='api_account_admin'),

    path('departements', views.departements_list_create_view, name='api_admin_departements'),
    path('departements/search', views.departement_search, name='api_admin_departement_search'),
    path('departements/<int:pk>', views.departement_view, name='api_admin_departement'),

    path('faculty', views.faculty_list_create_view, name='api_admin_faculties'),
    path('faculty/<int:pk>', views.faculty_view, name='api_admin_faculty'),
]