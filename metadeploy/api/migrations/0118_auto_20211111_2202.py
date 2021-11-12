# Generated by Django 3.1.13 on 2021-11-11 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0117_auto_20211020_1509'),
    ]

    operations = [
        migrations.AddField(
            model_name='version',
            name='publish_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='step',
            name='kind',
            field=models.CharField(choices=[('metadata', 'Metadata'), ('onetime', 'One Time Apex'), ('managed', 'Package'), ('data', 'Data'), ('other', 'Other')], default='metadata', max_length=64),
        ),
    ]
