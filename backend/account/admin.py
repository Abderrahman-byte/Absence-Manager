from django.contrib import admin

from backend.account.models import Account
from backend.account.forms import AccountCreationForm, AccountChangeForm

@admin.register(Account)
class AccountAdmin (admin.ModelAdmin) :
    form = AccountChangeForm
    add_form = AccountCreationForm
    model = Account
    list_display = ['email', 'first_name', 'last_name', 'is_admin', 'is_staff', 'is_superuser']

    def get_form(self, request, obj=None, **kwargs):
        defaults = {}

        if obj is None:
            defaults["form"] = self.add_form
        
        defaults.update(kwargs)
        return super().get_form(request, obj, **defaults)