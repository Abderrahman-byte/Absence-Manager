from django.db import models

class Person (models.Model) :
    """
    Abstract model for encapsulating email, first_name and last_ame fields."""
    email = models.EmailField("email", max_length=150, unique=True)
    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)

    class Meta:
        abstract = True

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between."""
        full_name = f"{self.last_name} {self.first_name}"
        return full_name.strip()

    def __str__(self):
        """
        Returns the full name."""
        return self.get_full_name()
