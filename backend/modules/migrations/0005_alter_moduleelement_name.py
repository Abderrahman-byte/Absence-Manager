# Generated by Django 4.1.2 on 2022-10-31 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0004_alter_module_name_module_unique_module_per_faculty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moduleelement',
            name='name',
            field=models.CharField(max_length=100, verbose_name='name'),
        ),
    ]
