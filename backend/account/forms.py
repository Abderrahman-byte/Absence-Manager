from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation

from backend.account.models import Account

class AccountCreationForm (forms.ModelForm) :
    error_messages = {
        "password_mismatch": "The two password fields didn’t match.",
    }
    password1 = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.PasswordInput(attrs={'autoComplete': 'new-password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )

    password2 = forms.CharField(
        label="Password confirmation",
        strip=False,
        widget=forms.PasswordInput(attrs={'autoComplete': 'new-password'}),
        help_text="Enter the same password as before, for verification.",
    )

    class Meta:
        model = Account
        fields = ("email","first_name", "last_name")
        field_classes = {"email": forms.EmailField}

    def clean_password2 (self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2 :
            raise ValidationError(
                "The two password fields didn’t match.",
                code="password_mismatch"
            )

        return password2

    def _post_clean (self):
        super()._post_clean()

        password = self.cleaned_data.get('password2')

        if password :
            try :
                password_validation.validate_password(password, self.instance)
            except ValidationError as error :
                self.add_error("password2", error)
                
    def save(self, commit=True):
        account = super().save(commit=False)
        account.set_password(self.cleaned_data['password1'])

        if commit :
            account.save()

        return account


class AccountChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label="Password",
        help_text=
            "Raw passwords are not stored, so there is no way to see this "
            "user’s password. " 
            # "but you can change the password using "
            # '<a href="{}">this form</a>.'
        ,
    )

    class Meta:
        model = Account
        fields = "__all__"
        field_classes = {"email": forms.EmailField}