from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from backend.core.models import Person
from backend.core.utils import generate_str

ACCOUNT_ID_LENGTH = 20

def generate_id () :
    return generate_str(ACCOUNT_ID_LENGTH)

class AccountManager (BaseUserManager) :
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
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


class Account (Person, AbstractBaseUser, PermissionsMixin) :
    """
    Customized Account model extens :class:`AbstractBaseUser`.

    Email and Password are required. Other fields are optional.

    superuser and is_staff fields are used in django admin and djang auth apps
    but is_admin fields used to specifie if user is an app administrator.
    """

    id = models.CharField("ID", primary_key=True, default=generate_id, max_length=ACCOUNT_ID_LENGTH)
    is_admin = models.BooleanField("admin status", default=False)

    # Django admin fields
    is_staff = models.BooleanField("staff status", default=False)
    is_active = models.BooleanField("active", default=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    objects = AccountManager()