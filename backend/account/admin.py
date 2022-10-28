from django.contrib import admin

from backend.account.models import Account

@admin.register(Account)
class AccountAdmin (admin.ModelAdmin) :
    list_display = ['email', 'is_staff', 'is_superuser']