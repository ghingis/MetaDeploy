# Generated by Django 2.1.2 on 2018-10-15 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_step_results_to_results'),
    ]

    operations = [
        migrations.AddField(
            model_name='preflightresult',
            name='is_valid',
            field=models.BooleanField(default=True),
        ),
    ]
