# Generated by Django 4.1.2 on 2022-10-28 23:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('modules', '0002_faculty_module_moduleelement'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='faculty',
            options={'verbose_name': 'Faculty', 'verbose_name_plural': 'Faculties'},
        ),
        migrations.AlterModelOptions(
            name='moduleelement',
            options={'verbose_name': 'element', 'verbose_name_plural': 'elements'},
        ),
        migrations.AlterField(
            model_name='departement',
            name='head_of_departement',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='head of departement'),
        ),
        migrations.AlterField(
            model_name='faculty',
            name='departement',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='modules.departement', verbose_name='departement'),
        ),
        migrations.AlterField(
            model_name='moduleelement',
            name='professor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='professor'),
        ),
    ]