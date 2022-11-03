from django.urls import path

from .views import AccountsAdminView, AccountAdminView

urlpatterns = [
    path('accounts', AccountsAdminView.as_view(), name='accounts_admin'),
    path('accounts/<str:pk>', AccountAdminView.as_view(), name='account_admin')
]