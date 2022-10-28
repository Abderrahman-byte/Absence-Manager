from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, PermissionsMixin, UserManager
from django.db import models
from django.utils.crypto import get_random_string

ACCOUNT_ID_LENGTH = 20

def generate_id () :
    allowed_chars="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    return get_random_string(ACCOUNT_ID_LENGTH, allowed_chars)

class AccountManager (BaseUserManager) :
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class Account (AbstractBaseUser, PermissionsMixin) :
    id = models.CharField("ID", primary_key=True, default=generate_id, max_length=ACCOUNT_ID_LENGTH)
    email = models.EmailField("email", max_length=150, unique=True)
    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)
    is_admin = models.BooleanField("admin status", default=False)

    # Django admin fields
    is_staff = models.BooleanField("staff status", default=False)
    is_active = models.BooleanField("active", default=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    objects = AccountManager()

    def get_full_name(self):
        full_name = f"{self.last_name} {self.first_name}"
        return full_name.strip()

    def __str__(self):
        return self.get_full_name()

"""
Note : superuser and staff fields are used in django admin and djang auth apps
        but is_admin fields used to specifie if user is an app admin 
        rather than dev admin or staff
"""