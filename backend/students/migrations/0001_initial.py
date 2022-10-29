# Generated by Django 4.1.2 on 2022-10-29 08:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('modules', '0003_alter_faculty_options_alter_moduleelement_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('email', models.EmailField(max_length=150, unique=True, verbose_name='email')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('cin', models.CharField(max_length=15, primary_key=True, serialize=False, verbose_name='CIN')),
                ('faculty', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='modules.faculty', verbose_name='Faculty')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
