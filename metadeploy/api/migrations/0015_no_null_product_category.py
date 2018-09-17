# Generated by Django 2.1.1 on 2018-09-17 21:33
"""
Populating this field so that it is not null should be handled by
0009_migrate_category_to_productcategory, but the gap between them
introduces the possibility of missing categories on later-added models.
Handle with care, and if you need to manually set the category on some
models, that should be OK.
"""

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_rename_package_url_to_repo_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                to='api.ProductCategory',
            ),
        ),
    ]
